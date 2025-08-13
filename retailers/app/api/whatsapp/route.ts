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
      // Use the caught error in the fallback message
      process.stderr.write(`Logging mechanism failed: ${sanitizeMessage(String(loggingError))}\n`);
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
    .replace(/\d{4,}/g, '[REDACTED]') // Remove long numbers
    .substring(0, 500); // Limit message length
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
        { success: false, error: 'Invalid phone number format. Use E.164 format (e.g., +254700123456)' },
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
      
      // Limit to 10 media items (Twilio limitation)
      if (messageOptions.mediaUrl.length > 10) {
        messageOptions.mediaUrl = messageOptions.mediaUrl.slice(0, 10);
      }
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
    
    // Block potentially dangerous protocols
    if (!['https:', 'http:'].includes(parsed.protocol)) {
      return false;
    }
    
    // Block internal/private addresses
    const hostname = parsed.hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname.endsWith('.localhost') ||
      hostname === '127.0.0.1' ||
      hostname === '[::1]' ||
      /(^|\.)internal$/.test(hostname) ||
      /^10\./.test(parsed.host) ||       // Private IP range
      /^192\.168\./.test(parsed.host) || // Private IP range
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(parsed.host) // Private IP range
    ) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'operational',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
}