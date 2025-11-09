import { inngest } from "@/inngest/client";
import { Agent, createAgent, openai } from "@inngest/agent-kit"

// Utility function to send events to Inngest
export async function sendEvent(name: string, data: any) {
  try {
    const result = await inngest.send({
      name,
      data,
    });
    console.log(`Event sent successfully: ${name}`, result);
    return result;
  } catch (error) {
    console.error(`Failed to send event: ${name}`, error);
    throw error;
  }
}

// Utility function to send multiple events at once
export async function sendEvents(events: Array<{name: string, data: any}>) {
  try {
    const result = await inngest.send(events.map(event => ({
      name: event.name,
      data: event.data,
    })));
    console.log(`Events sent successfully: ${events.length} events`, result);
    return result;
  } catch (error) {
    console.error(`Failed to send events:`, error);
    throw error;
  }
}

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {

    const summarizer = createAgent({
      name: 'Summarizer',
      system:
        "You are an expert summarizer. You summarize in 2 words.",
      model: openai({
        model: 'gpt-4o',
        apiKey: process.env.OPENAI_API_KEY,
        defaultParameters: {
          max_completion_tokens: 1000,
        },
      }),
    });

    const { output } = await summarizer.run(`Summarize the following text:${event.data.value}`)
    console.log(output)

    await step.sleep("wait-a-moment", "5s");
    return { success: "ok" }
  },
);