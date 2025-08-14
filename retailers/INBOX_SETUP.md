# Inbox Setup Guide

This guide explains how to set up the inbox functionality to use real database data instead of mock data.

## Database Setup

### 1. Run the Database Migration

Execute the SQL script in your Supabase SQL editor:

```sql
-- Copy and paste the contents of database-setup.sql
```

This will create:
- `conversations` table - stores conversation metadata
- `messages` table - stores individual messages
- Proper indexes for performance
- Row Level Security (RLS) policies
- Triggers for automatic timestamp updates

### 2. Verify Database Tables

After running the migration, you should see:
- `conversations` table with columns: id, customer_id, retailer_id, status, priority, last_message, unread_count, last_activity, assigned_to, created_at, updated_at
- `messages` table with columns: id, conversation_id, text, sender, timestamp, status, created_at

## New Features

### Real Database Integration

The inbox now uses real database data instead of mock data:

1. **Conversations**: Fetched from the `conversations` table
2. **Messages**: Fetched from the `messages` table  
3. **Customers**: Fetched from the existing `customers` table
4. **Real-time Updates**: Messages are saved to the database

### New Database Actions

Created new actions in `app/actions/conversations/`:

- `getConversations.ts` - Fetch all conversations for the current retailer
- `getMessages.ts` - Fetch messages for a specific conversation
- `sendMessage.ts` - Send a new message and save to database
- `createConversation.ts` - Create a new conversation

### New Service Layer

Created `app/lib/inboxService.ts` that provides:

- `fetchInboxData()` - Get conversations and customers
- `fetchCustomerById()` - Get customer details
- `fetchConversationMessages()` - Get messages for a conversation
- `sendNewMessage()` - Send a message
- `createNewConversation()` - Create a new conversation

## Updated Components

### MessageThread Component

- Now loads messages from the database when a conversation is selected
- Shows loading state while fetching messages
- Displays real conversation data

### MessageInput Component

- Sends messages to the database
- Shows sending state
- Updates conversation metadata after sending

### Inbox Page

- Uses the new InboxService instead of mock data
- Handles message sending and updates
- Maintains real-time conversation state

## Usage

### Starting a New Conversation

When a customer sends their first message, a new conversation will be automatically created in the database.

### Sending Messages

1. Select a conversation from the list
2. Type your message in the input field
3. Press Enter or click the send button
4. The message is saved to the database and the conversation is updated

### Viewing Messages

Messages are automatically loaded when you select a conversation. The system shows a loading indicator while fetching messages from the database.

## Error Handling

The system includes proper error handling:

- Database connection errors are logged
- Failed message sends are handled gracefully
- Loading states prevent UI issues
- Fallback to empty states when data is unavailable

## Security

- Row Level Security (RLS) ensures retailers can only see their own conversations
- All database queries are authenticated
- Customer data is properly isolated by retailer

## Performance

- Database indexes optimize query performance
- Messages are loaded on-demand
- Conversations are sorted by last activity
- Efficient joins between conversations and customers

## Testing

To test the new functionality:

1. Ensure you have customers in your database
2. Navigate to the inbox page
3. Try sending messages (they will be saved to the database)
4. Check that conversations appear in the list
5. Verify that customer profiles show real data

## Troubleshooting

### No Conversations Showing

- Check that you have customers in your database
- Verify that the `conversations` table was created
- Check browser console for any errors

### Messages Not Sending

- Verify that the `messages` table was created
- Check that RLS policies are in place
- Ensure you're authenticated

### Database Connection Issues

- Verify your Supabase configuration
- Check that the database URL and keys are correct
- Ensure the database is accessible

## Next Steps

Consider implementing these additional features:

1. **Real-time Updates**: Use Supabase real-time subscriptions
2. **Message Status**: Track delivered/read status
3. **File Attachments**: Support for images and documents
4. **Message Templates**: Pre-written responses
5. **Conversation Assignment**: Assign conversations to specific agents
6. **Message Search**: Search through conversation history
