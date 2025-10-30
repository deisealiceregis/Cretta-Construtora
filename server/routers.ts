import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getConstrucoes, createConstrucao, getProjetos, createProjeto, getReformas, createReforma } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  construcoes: router({
    list: publicProcedure.query(async () => {
      return getConstrucoes();
    }),
    create: publicProcedure
      .input(z.object({
        titulo: z.string(),
        descricao: z.string(),
        cliente: z.string(),
        localizacao: z.string(),
        pavimentos: z.number().optional(),
        apartamentos: z.number().optional(),
        area: z.number().optional(),
        fotoUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return createConstrucao(input);
      }),
  }),

  projetos: router({
    list: publicProcedure.query(async () => {
      return getProjetos();
    }),
    create: publicProcedure
      .input(z.object({
        titulo: z.string(),
        descricao: z.string(),
        cliente: z.string(),
        localizacao: z.string(),
        pavimentos: z.number().optional(),
        apartamentos: z.number().optional(),
        area: z.number().optional(),
        fotoUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return createProjeto(input);
      }),
  }),

  reformas: router({
    list: publicProcedure.query(async () => {
      return getReformas();
    }),
    create: publicProcedure
      .input(z.object({
        titulo: z.string(),
        descricao: z.string(),
        cliente: z.string(),
        localizacao: z.string(),
        area: z.number().optional(),
        fotoUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return createReforma(input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
