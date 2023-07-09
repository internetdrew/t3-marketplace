import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import {
  getAuth,
  type SignedInAuthObject,
  type SignedOutAuthObject,
} from "@clerk/nextjs/server";

import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { prisma } from "~/server/db";

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
}

const createInnerTRPCContext = async ({ auth }: AuthContext) => {
  return {
    prisma,
    auth,
  };
};

export const createTRPCContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  return await createInnerTRPCContext({
    auth: getAuth(opts.req),
  });
};

export type Context = trpc.inferAsyncReturnType<typeof createTRPCContext>;

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});
/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
