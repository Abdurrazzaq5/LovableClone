import { initTRPC } from '@trpc/server';
import { z } from 'zod';

export const t = initTRPC.create();
export const appRouter = t.router({
    // Create procedure at path 'login'
    // The syntax is identical to creating queries
    invoke: t.procedure
        // using zod schema to validate and infer input values
        .input(
            z.object({
                name: z.string(),
            }),
        )
        .mutation((opts) => {
            // Here some login stuff would happen
            return {
                user: {
                    name: opts.input.name,
                    role: 'ADMIN',
                },
                ok: "success"
            };
        }),
});
// export type definition of API
export type AppRouter = typeof appRouter; 