// app/api/whatsapp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

// Define safe logging interface
interface SafeLogger {
  error: (message: string, error?: unknown) => void;
}

// Implement safe logger with sanitization
const productionLogger: SafeLogger = {
  error: (message, error) => {
    try {
      const safeMessage = `${message} - ${sanitizeError(error)}`;
      process.stderr.write(`${new Date().toISOString()} [ERROR] ${safeMessage}\n`);
    } catch (loggingError) {
      process.stderr.write('Logging mechanism failed!\n');
    }
  }
};

const developmentLogger: SafeLogger = {
  error: (message, error) => {
    console.error(message, error);
  }
};

// Use environment-based logger
const logger = process.env.NODE_ENV === 'production' 
  ? productionLogger 
  : developmentLogger;

// Sanitize errors for production logging
function sanitizeError(error: unknown): string {
  if (error instanceof Error) {
    return `Error: ${error.name} - ${sanitizeMessage(error.message)}`;
  }
  return 'Unknown error type';
}

// Remove sensitive information from messages
function sanitizeMessage(message: string): string {
  return message
    .replace(/authToken=\w+/g, 'authToken=[REDACTED]')
    .replace(/accountSid=\w+/g, 'accountSid=[REDACTED]')
    .replace(/\d{4,}/g, '[REDACTED]'); // Remove long numbers
}

// Define message options interface
interface MessageOptions {
  from: string;
  to: string;
  body?: string;
  mediaUrl?: string[];
}

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  throw new Error('Missing Twilio credentials');
}

const client = twilio(accountSid, authToken);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, message: bodyText, mediaUrl } = body;

    // Validate phone number format
    if (!to || !/^\+[1-9]\d{1,14}$/.test(to)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number format. Use E.164 format (e.g., +14155552671)' },
        { status: 400 }
      );
    }

    if (!bodyText && !mediaUrl) {
      return NextResponse.json(
        { success: false, error: 'Message content or media URL required' },
        { status: 400 }
      );
    }

    const messageOptions: MessageOptions = {
      from: "whatsapp:+14155238886",
      to: `whatsapp:${to}`,
    };

    if (bodyText) messageOptions.body = bodyText;
    if (mediaUrl) {
      messageOptions.mediaUrl = Array.isArray(mediaUrl) 
        ? mediaUrl.filter(url => isValidMediaUrl(url))
        : [mediaUrl].filter(url => isValidMediaUrl(url));
    }

    const message = await client.messages.create(messageOptions);

    return NextResponse.json({
      success: true,
      messageSid: message.sid,
      status: message.status,
    });

  } catch (error) {
    const errorId = Math.random().toString(36).substring(2, 9);
    const userMessage = 'Message processing failed. Please try again later.';
    
    logger.error(`[ErrorID: ${errorId}] WhatsApp API Error`, error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: userMessage,
        errorId,
        supportContact: process.env.SUPPORT_EMAIL || 'support@example.com'
      },
      { status: 500 }
    );
  }
}

// Validate media URLs
function isValidMediaUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ['https:', 'http:'].includes(parsed.protocol) &&
           !parsed.hostname.includes('localhost') &&
           !parsed.hostname.includes('127.0.0.1');
  } catch {
    return false;
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'operational',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '1.0.0'
  });
}