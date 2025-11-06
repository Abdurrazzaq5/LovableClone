'use client';

import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
const Page = () => {
  // Mutation
  const mutation = trpc.invoke.useMutation();

  const handleClick = () => {
    mutation.mutate(
      { name: 'Alice' },
      {
        onSuccess: () => {
          // Line 15’s onSuccess belongs to the second argument of .mutate() on line 12
          // because trpc.invoke.useMutation() returns a TanStack Query mutation whose
          // .mutate() accepts (variables, options) – and options can include onSuccess.
          toast.success("Background job started.")
        },
      }
    );
  };

  return (
    <div className="p-4 max-w-9xl mx-auto">
      <Button onClick={() => handleClick()}>
        Invoke background job
      </Button>
    </div>
  );
};

export default Page;