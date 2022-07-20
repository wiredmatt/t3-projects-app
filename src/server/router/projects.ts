import { z } from "zod";
import { createRouter } from "./context";

export const projectsRouter = createRouter()
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
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
      fullDescription: z.string(),
      externalUrl: z.string().optional(),
      slug: z.string(),
      logo: z.string().optional(),
      coverImage: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.project.create({
        data: {
          ...input,
          shortDescription: input.fullDescription.slice(0, 50),
          userId: ctx.session!.user!.id!,
          slug: input.slug.replace(/\W/g, "-"),
        },
      });
    },
  });
