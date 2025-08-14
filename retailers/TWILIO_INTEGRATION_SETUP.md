# Twilio Integration Setup Guide

This guide explains how to set up Twilio WhatsApp integration with the inbox system for sending digital receipts and managing customer communications.

## Overview

The integration allows you to:
- Send digital receipts via WhatsApp when sales are made
- Save all WhatsApp messages to the inbox database
- Handle incoming customer messages through webhooks
- Manage conversations seamlessly between WhatsApp and the inbox

## Prerequisites

1. **Twilio Account**: Sign up at [twilio.com](https://www.twilio.com)
2. **WhatsApp Business API**: Enable WhatsApp messaging in your Twilio console
3. **Webhook URL**: Your application must be accessible via HTTPS for webhooks

## Environment Variables

Add these to your `.env.local` file:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here

# WhatsApp Configuration
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# Webhook Configuration
WEBHOOK_BASE_URL=https://your-domain.com
```

## Database Setup

Ensure you have the inbox database tables set up by running the SQL script from `database-setup.sql`.

## Twilio Console Configuration

### 1. WhatsApp Sandbox Setup

1. Go to your Twilio Console
2. Navigate to **Messaging** > **Try it out** > **Send a WhatsApp message**
3. Follow the instructions to join your WhatsApp sandbox
4. Note your WhatsApp number (e.g., +14155238886)

### 2. Webhook Configuration

1. In Twilio Console, go to **Messaging** > **Settings** > **WhatsApp webhooks**
2. Set the webhook URL to: `https://your-domain.com/api/whatsapp/webhook`
3. Set the HTTP method to `POST`
4. Save the configuration

### 3. Phone Number Configuration

1. Go to **Phone Numbers** > **Manage** > **Active numbers**
2. Select your WhatsApp-enabled number
3. Under **Messaging**, set the webhook URL to: `https://your-domain.com/api/whatsapp/webhook`
4. Set the HTTP method to `POST`

## API Endpoints

### 1. Send WhatsApp Message
- **Endpoint**: `POST /api/whatsapp`
- **Purpose**: Send messages via Twilio WhatsApp API
- **Usage**: Used by the TwilioService for sending receipts and messages

### 2. WhatsApp Webhook
- **Endpoint**: `POST /api/whatsapp/webhook`
- **Purpose**: Receive incoming WhatsApp messages
- **Usage**: Automatically saves customer messages to the inbox

## Usage Examples

### Sending Digital Receipts

```typescript
import { TwilioService } from '@/app/lib/twilioService';

const receiptData = {
  storeName: 'My Boutique',
  date: new Date().toLocaleDateString(),
  receiptNumber: 'RCP-12345',
  items: [
    { name: 'Blue Dress', price: 2500, quantity: 1 },
    { name: 'Red Shoes', price: 1800, quantity: 1 }
  ],
  total: 4300,
  customerId: 'customer-uuid',
  customerName: 'Sarah Mwangi',
  customerPhone: '+254723111222'
};

const response = await TwilioService.sendWhatsAppReceipt(
  receiptData.customerPhone,
  receiptData
);
```

### Sending Follow-up Messages

```typescript
import { sendFollowUpMessage } from '@/app/(main)/pos/Basic/HelperFunctions/sales';

const response = await sendFollowUpMessage(
  customerId,
  customerPhone,
  'Thank you for your purchase! We hope you love your new items. 🛍️'
);
```

### Order Confirmations

```typescript
import { sendOrderConfirmation } from '@/app/(main)/pos/Basic/HelperFunctions/sales';

const response = await sendOrderConfirmation(
  customerId,
  customerPhone,
  {
    orderNumber: 'ORD-12345',
    items: [
      { name: 'Blue Dress', price: 2500, quantity: 1 }
    ],
    total: 2500,
    estimatedDelivery: '2-3 business days'
  }
);
```

## Integration with POS System

### 1. Update POS Success Screen

When a sale is completed, the system automatically:
- Sends a digital receipt via WhatsApp
- Saves the receipt message to the inbox
- Creates a conversation thread for the customer

### 2. Customer Communication

All customer interactions are now unified:
- WhatsApp messages appear in the inbox
- Inbox messages are sent via WhatsApp
- Complete conversation history is maintained

## Testing

### 1. Test Message Sending

```bash
# Test the WhatsApp API endpoint
curl -X POST http://localhost:3000/api/whatsapp \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+254723111222",
    "message": "Test message from Zuriscale"
  }'
```

### 2. Test Webhook (Local Development)

For local development, use ngrok to expose your local server:

```bash
# Install ngrok
npm install -g ngrok

# Start your Next.js app
npm run dev

# In another terminal, expose your local server
ngrok http 3000

# Use the ngrok URL in your Twilio webhook configuration
```

### 3. Test Receipt Sending

1. Complete a sale in the POS system
2. Check that the receipt is sent via WhatsApp
3. Verify the message appears in the inbox
4. Test customer responses through the webhook

## Error Handling

The system includes comprehensive error handling:

- **Twilio API Errors**: Logged and handled gracefully
- **Webhook Failures**: Retry mechanisms and error logging
- **Database Errors**: Fallback to local storage
- **Network Issues**: Automatic retries with exponential backoff

## Monitoring

### 1. Logs

Monitor these logs for issues:
- Twilio API responses
- Webhook processing
- Database operations
- Error messages

### 2. Twilio Console

Check the Twilio console for:
- Message delivery status
- Webhook delivery logs
- Error reports
- Usage statistics

## Security Considerations

### 1. Environment Variables

- Never commit Twilio credentials to version control
- Use environment variables for all sensitive data
- Rotate auth tokens regularly

### 2. Webhook Security

- Validate webhook signatures (optional but recommended)
- Implement rate limiting
- Log all webhook requests for monitoring

### 3. Data Privacy

- Ensure customer consent for WhatsApp communications
- Follow local data protection regulations
- Implement data retention policies

## Troubleshooting

### Common Issues

1. **Messages Not Sending**
   - Check Twilio credentials
   - Verify phone number format (E.164)
   - Check account balance

2. **Webhook Not Receiving Messages**
   - Verify webhook URL is accessible
   - Check webhook configuration in Twilio console
   - Monitor webhook logs

3. **Messages Not Appearing in Inbox**
   - Check database connection
   - Verify customer exists in database
   - Check webhook processing logs

### Debug Commands

```bash
# Check webhook endpoint
curl -X GET https://your-domain.com/api/whatsapp/webhook

# Test message sending
curl -X POST https://your-domain.com/api/whatsapp \
  -H "Content-Type: application/json" \
  -d '{"to": "+254723111222", "message": "Test"}'
```

## Next Steps

Consider implementing these additional features:

1. **Message Templates**: Pre-approved message templates for common scenarios
2. **Media Support**: Send images and documents via WhatsApp
3. **Message Status**: Track delivered/read status
4. **Automated Responses**: AI-powered auto-replies
5. **Analytics**: Track message engagement and response rates
6. **Multi-language Support**: Support for multiple languages

## Support

For issues with:
- **Twilio Integration**: Check Twilio documentation and support
- **Database Issues**: Review the inbox setup guide
- **Application Errors**: Check application logs and error handling
