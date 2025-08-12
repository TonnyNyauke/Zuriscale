// app/api/whatsapp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  throw new Error('Missing Twilio credentials in environment variables');
}

const client = twilio(accountSid, authToken);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, message: bodyText, mediaUrl } = body;

    // Validate required fields
    if (!to) {
      return NextResponse.json(
        { success: false, error: 'Phone number (to) is required' },
        { status: 400 }
      );
    }

    // Prepare message options
    const messageOptions: any = {
      from: "whatsapp:+14155238886", // Your Twilio WhatsApp number
      to: `whatsapp:${to}`, // Format: whatsapp:+1234567890
    };

    // Add body text if provided
    if (bodyText) {
      messageOptions.body = bodyText;
    }

    // Add media URL if provided
    if (mediaUrl) {
      messageOptions.mediaUrl = Array.isArray(mediaUrl) ? mediaUrl : [mediaUrl];
    }

    // Create and send the message
    const message = await client.messages.create(messageOptions);

    console.log('WhatsApp message sent:', message.sid);

    return NextResponse.json({
      success: true,
      messageSid: message.sid,
      status: message.status,
    });

  } catch (error: any) {
    console.error('WhatsApp API Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to send WhatsApp message',
        code: error.code,
      },
      { status: 500 }
    );
  }
}

// Optional: Add a GET method for testing
export async function GET() {
  return NextResponse.json({
    message: 'WhatsApp API endpoint is working',
    timestamp: new Date().toISOString(),
  });
}