import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ 
  id: "loveable-clone",
  // In development, events will be sent to the dev server at localhost:8288
  // No event key is required for local development
});