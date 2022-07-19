import { z } from "zod";
import { createRouter } from "./context";

export const projectRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.project.findMany();
    },
  })
  .query("getByUser", {
    input: z.object({
      userId: z.string().cuid(),
      take: z.number().optional().default(6),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.project.findMany({
        where: {
          userId: input.userId,
        },
        take: input.take,
      });
    },
  });
