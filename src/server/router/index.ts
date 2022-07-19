// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";

import { authRouter } from "./auth";
import { projectRouter } from "./project";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("project.", projectRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
