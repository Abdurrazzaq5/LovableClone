'use client';

import { trpc } from '@/utils/trpc';

export default function MyComponent() {
  const { data, isLoading } = trpc.createAI.useQuery({ text: 'World' });

  if (isLoading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data?.greeting)}</div>;
}