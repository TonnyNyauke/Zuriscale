import { NextRequest, NextResponse } from 'next/server';
import { InboxService } from '@/app/lib/inboxService';
import { getCustomers } from '@/app/actions/customers/getCustomers';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract message data from Twilio webhook
    const from = formData.get('From') as string;
    const body = formData.get('Body') as string;
    const messageSid = formData.get('MessageSid') as string;
    const timestamp = formData.get('Timestamp') as string;
    
    console.log('Received WhatsApp webhook:', {
      from,
      body: body?.substring(0, 100) + '...',
      messageSid,
      timestamp
    });

    // Validate required fields
    if (!from || !body || !messageSid) {
      console.error('Missing required fields in webhook');
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Extract phone number from WhatsApp format (whatsapp:+254700123456)
    const phoneNumber = from.replace('whatsapp:', '');
    
    // Find customer by phone number
    const customers = await getCustomers();
    const customer = customers.find(c => c.phone_number === phoneNumber);
    
    if (!customer) {
      console.log(`No customer found for phone number: ${phoneNumber}`);
      return NextResponse.json({ success: false, error: 'Customer not found' }, { status: 404 });
    }

    // Get or create conversation for this customer
    const conversation = await InboxService.getConversationWithMessages(customer.id);
    
    if (!conversation) {
      // Create new conversation if none exists
      const newConversation = await InboxService.createNewConversation(customer.id);
      
      // Save the incoming message
      await InboxService.sendNewMessage(newConversation.id, body);
    } else {
      // Save the incoming message to existing conversation
      await InboxService.sendNewMessage(conversation.id, body);
    }

    console.log(`Message saved to inbox for customer: ${customer.name}`);

    // Return success response to Twilio
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error processing WhatsApp webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'WhatsApp webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}
