import { z } from "zod";
import { createRouter } from "./context";

export const projectsRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.project.findMany();
    },
  })
  .query("getByUser", {
    input: z
      .object({
        userId: z.string().cuid(),
        name: z.string().cuid(),
        take: z.number().optional().default(6),
      })
      .partial()
      .refine(
        (data) => !!data.userId || !!data.name,
        "Either name or userId should be filled in."
      ),
    async resolve({ ctx, input }) {
      return await ctx.prisma.project.findMany({
        where: {
          user: input.userId
            ? {
                id: input.userId,
              }
            : {
                name: input.name,
              },
        },
        take: input.take,
      });
    },
  })
  .query("getBySlug", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.project.findUnique({
        where: {
          slug: input.slug,
        },
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
          slug: ctx.session?.user?.name + "/" + input.slug.replace(/\W/g, "-"),
        },
      });
    },
  });
