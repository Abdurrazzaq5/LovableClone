# Inngest Event Sending Integration

This project now includes Inngest event sending functionality that allows you to send events to your Inngest dev server running on localhost:8288.

## Features Added

### 1. Event Sending Utilities (`src/inngest/functions.ts`)
- `sendEvent(name, data)` - Send a single event to Inngest
- `sendEvents(events)` - Send multiple events in batch
- Automatic error handling and logging
- No event key required for local development

### 2. Server-Side Event Sending
- Events are automatically sent when pages load
- Example in `src/app/page.tsx` sends `demo/page.view` event
- Example in `src/app/test-events/page.tsx` sends `demo/test.page.loaded` event

### 3. Client-Side Event Sending (`src/app/client-greeting.tsx`)
- Interactive buttons to send events from the browser
- Send single events or batch events
- Real-time feedback with alerts

### 4. API Route for Event Sending (`src/app/api/send-event/route.ts`)
- POST endpoint to send events from any source
- Supports single events and batch events
- Error handling with proper HTTP status codes

## Setup Instructions

### 1. Install Inngest Dev Server
```bash
npm install -g inngest
```

### 2. Start Inngest Dev Server
```bash
inngest dev
```
The dev server will run on `http://localhost:8288`

### 3. Start Your Next.js Application
```bash
npm run dev
```

### 4. Test the Event Sending

#### Option 1: Visit the Main Page
- Navigate to `http://localhost:3000`
- A server-side event is automatically sent on page load
- Use the client-side buttons in the ClientGreeting component

#### Option 2: Visit the Test Events Page
- Navigate to `http://localhost:3000/test-events`
- View server-side event examples
- Test API routes with curl commands provided

#### Option 3: Use the API Route
```bash
# Send a single event
curl -X POST http://localhost:3000/api/send-event \
  -H "Content-Type: application/json" \
  -d '{
    "type": "api/test",
    "data": {
      "message": "Test from API",
      "timestamp": "'$(date -Iseconds)'"
    }
  }'

# Send batch events
curl -X POST http://localhost:3000/api/send-event \
  -H "Content-Type: application/json" \
  -d '{
    "batch": true,
    "data": [
      {
        "name": "api/batch1",
        "data": {"id": 1, "message": "First batch event"}
      },
      {
        "name": "api/batch2", 
        "data": {"id": 2, "message": "Second batch event"}
      }
    ]
  }'
```

## Event Examples

### User Events
- `user/signup` - When a user signs up
- `user/login` - When a user logs in  
- `user/action` - When a user performs an action

### System Events
- `system/health` - System health checks
- `system/error` - System errors
- `system/maintenance` - Maintenance events

### Demo Events (automatically sent)
- `demo/page.view` - When home page loads
- `demo/test.page.loaded` - When test events page loads
- `demo/client.action` - When client-side button is clicked
- `demo/client.batch1/2` - Batch events from client

## Code Examples

### Send a Single Event (Server-side)
```typescript
import { sendEvent } from "@/inngest/functions";

await sendEvent("user/signup", {
  userId: "user-123",
  email: "user@example.com",
  timestamp: new Date().toISOString()
});
```

### Send Batch Events (Server-side)
```typescript
import { sendEvents } from "@/inngest/functions";

await sendEvents([
  {
    name: "user/action",
    data: { userId: "user-123", action: "button-click" }
  },
  {
    name: "system/health",
    data: { status: "ok", uptime: 100 }
  }
]);
```

### Send Events from Client-side
```typescript
import { sendEvent } from "@/inngest/functions";

// In a client component
await sendEvent("client/interaction", {
  userId: "user-123",
  action: "button-click",
  element: "submit-button"
});
```

## Monitoring Events

1. **Inngest Dev Server Dashboard**: Visit `http://localhost:8288` to see the Inngest dev server interface
2. **Console Logs**: Check your browser console and terminal for event sending logs
3. **Network Tab**: Use browser dev tools to see the HTTP requests to Inngest

## Production Setup

For production, you'll need to:
1. Create an Inngest account and get an Event Key
2. Set the `INNGEST_EVENT_KEY` environment variable
3. Configure the Inngest client with your production settings

## Troubleshooting

### Events not appearing in Inngest
- Ensure Inngest dev server is running on `localhost:8288`
- Check browser console for error messages
- Verify network requests are reaching the dev server

### Connection refused errors
- Make sure Inngest dev server is started before your Next.js app
- Check if port 8288 is available and not blocked by firewall

### Build errors
- Ensure all imports are correct and files exist
- Check that the Inngest package is properly installed

