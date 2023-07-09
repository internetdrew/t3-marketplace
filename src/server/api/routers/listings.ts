import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ name: z.string(), description: z.string(), price: z.number() })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.listing.create({
        data: { ...input, userId: ctx.auth.userId },
      });
    }),
});
