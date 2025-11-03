import React from 'react';
import { prisma } from '@/lib/db';

const Page = async () => {
  const post = await prisma.post.findMany();

  return (
    <div>
      {JSON.stringify(post, null, 2)}
    </div>
  );
}

export default Page