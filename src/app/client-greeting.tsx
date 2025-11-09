'use client';
import { trpc } from '@/utils/trpc';
import { useState, useEffect } from 'react';
import { sendEvent, sendEvents } from "@/inngest/functions";

export function ClientGreeting() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])

    // Only enable the query after the component has mounted on the client
    const mutation = trpc.invoke.useMutation();
    const { data, isPending } = mutation;

    // Trigger the mutation when component is mounted
    useEffect(() => {
        if (isMounted) {
            mutation.mutate({ value: "Hello from client" });
        }
    }, [isMounted]);

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Client Component</h2>
            {isPending ? (
                <p>Loading client greeting...</p>
            ) : (
                <p className="text-lg">Greeting from client: <strong>{data?.ok || "Not loaded"}</strong></p>
            )}

            {/* Client-side event sending demo */}
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Client-side Event Demo</h3>
                <p className="text-sm text-gray-600 mb-3">
                    Send events directly from the client to Inngest dev server
                </p>

                <div className="space-y-2">
                    <button
                        onClick={async () => {
                            try {
                                await sendEvent("demo/client.action", {
                                    userId: "client-user-123",
                                    action: "client-button-click",
                                    timestamp: new Date().toISOString(),
                                    source: "client-component",
                                    metadata: {
                                        page: "home",
                                        element: "client-demo-button"
                                    }
                                });
                                alert("Client event sent successfully! Check your Inngest dev server logs.");
                            } catch (error) {
                                alert("Failed to send client event. Make sure Inngest dev server is running on localhost:8288");
                            }
                        }}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm mr-2"
                    >
                        Send Client Event
                    </button>

                    <button
                        onClick={async () => {
                            try {
                                await sendEvents([
                                    {
                                        name: "demo/client.batch1",
                                        data: { message: "First client event", type: "interaction" }
                                    },
                                    {
                                        name: "demo/client.batch2",
                                        data: { message: "Second client event", type: "navigation" }
                                    }
                                ]);
                                alert("Client batch events sent successfully! Check your Inngest dev server logs.");
                            } catch (error) {
                                alert("Failed to send client batch events. Make sure Inngest dev server is running on localhost:8288");
                            }
                        }}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Send Client Batch
                    </button>
                </div>
            </div>
        </div>
    );
}