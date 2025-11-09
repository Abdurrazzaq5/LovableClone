import { NextRequest, NextResponse } from "next/server";
import { sendEvent, sendEvents } from "@/inngest/functions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data, batch } = body;

    if (batch && Array.isArray(data)) {
      // Send batch events
      const result = await sendEvents(data);
      return NextResponse.json({ 
        success: true, 
        message: "Batch events sent successfully",
        result 
      });
    } else {
      // Send single event
      const result = await sendEvent(type, data);
      return NextResponse.json({ 
        success: true, 
        message: "Event sent successfully",
        result 
      });
    }
  } catch (error) {
    console.error("Failed to send event:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to send event",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// Example usage:
// Single event: POST /api/send-event
// Body: { "type": "user/signup", "data": { "userId": "123", "email": "user@example.com" } }
// 
// Batch events: POST /api/send-event  
// Body: { "batch": true, "data": [{ "name": "event1", "data": {...} }, { "name": "event2", "data": {...} }] }