import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getConstrucoes, createConstrucao, updateConstrucao, deleteConstrucao, getProjetos, createProjeto, updateProjeto, deleteProjeto, getReformas, createReforma, updateReforma, deleteReforma, getSettings, updateSettings, getImagensByProjetoId, createImagem, deleteImagem, updateImagemOrdem, getDepoimentos, createDepoimento, updateDepoimento, deleteDepoimento, createOrcamento, getOrcamentos, updateOrcamento, deleteOrcamento } from "./db";

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
        status: z.enum(["planejamento", "em_andamento", "concluida"]).optional(),
        progresso: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return createConstrucao(input);
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        titulo: z.string().optional(),
        descricao: z.string().optional(),
        cliente: z.string().optional(),
        localizacao: z.string().optional(),
        pavimentos: z.number().optional(),
        apartamentos: z.number().optional(),
        area: z.number().optional(),
        fotoUrl: z.string().optional(),
        status: z.enum(["planejamento", "em_andamento", "concluida"]).optional(),
        progresso: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updateConstrucao(id, data);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return deleteConstrucao(input.id);
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
        status: z.enum(["planejamento", "em_andamento", "concluida"]).optional(),
        progresso: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return createProjeto(input);
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        titulo: z.string().optional(),
        descricao: z.string().optional(),
        cliente: z.string().optional(),
        localizacao: z.string().optional(),
        pavimentos: z.number().optional(),
        apartamentos: z.number().optional(),
        area: z.number().optional(),
        fotoUrl: z.string().optional(),
        status: z.enum(["planejamento", "em_andamento", "concluida"]).optional(),
        progresso: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updateProjeto(id, data);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return deleteProjeto(input.id);
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
        status: z.enum(["planejamento", "em_andamento", "concluida"]).optional(),
        progresso: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return createReforma(input);
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        titulo: z.string().optional(),
        descricao: z.string().optional(),
        cliente: z.string().optional(),
        localizacao: z.string().optional(),
        area: z.number().optional(),
        fotoUrl: z.string().optional(),
        status: z.enum(["planejamento", "em_andamento", "concluida"]).optional(),
        progresso: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updateReforma(id, data);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return deleteReforma(input.id);
      }),
  }),

  settings: router({
    get: publicProcedure.query(async () => {
      return getSettings();
    }),
    update: publicProcedure
      .input(z.object({
        primaryColor: z.string().optional(),
        secondaryColor: z.string().optional(),
        accentColor: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return updateSettings(input);
      }),
  }),

  imagens: router({
    getByProjetoId: publicProcedure
      .input(z.object({
        projetoId: z.number(),
        tipo: z.enum(["construcao", "projeto", "reforma"]),
      }))
      .query(async ({ input }) => {
        return getImagensByProjetoId(input.projetoId, input.tipo);
      }),
    create: publicProcedure
      .input(z.object({
        projetoId: z.number(),
        tipo: z.enum(["construcao", "projeto", "reforma"]),
        url: z.string(),
        titulo: z.string().optional(),
        ordem: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return createImagem(input);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return deleteImagem(input.id);
      }),
    updateOrdem: publicProcedure
      .input(z.object({ id: z.number(), ordem: z.number() }))
      .mutation(async ({ input }) => {
        return updateImagemOrdem(input.id, input.ordem);
      }),
  }),

  depoimentos: router({
    list: publicProcedure.query(async () => {
      return getDepoimentos();
    }),
    create: publicProcedure
      .input(z.object({
        nome: z.string(),
        cargo: z.string(),
        empresa: z.string(),
        texto: z.string(),
        avaliacao: z.number().min(1).max(5),
        fotoUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return createDepoimento(input);
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        nome: z.string().optional(),
        cargo: z.string().optional(),
        empresa: z.string().optional(),
        texto: z.string().optional(),
        avaliacao: z.number().min(1).max(5).optional(),
        fotoUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updateDepoimento(id, data);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return deleteDepoimento(input.id);
      }),
  }),

  orcamentos: router({
    list: publicProcedure.query(async () => {
      return getOrcamentos();
    }),
    create: publicProcedure
      .input(z.object({
        nome: z.string().min(1, "Nome é obrigatório"),
        email: z.string().email("Email inválido"),
        telefone: z.string().min(1, "Telefone é obrigatório"),
        tipo: z.enum(["construcao", "reforma", "projeto"]),
        assunto: z.string().min(1, "Assunto é obrigatório"),
        descricao: z.string().min(1, "Descrição é obrigatória"),
        localizacao: z.string().optional(),
        area: z.number().optional(),
        orcamento: z.string().optional(),
        prazo: z.string().optional(),
        observacoes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return createOrcamento(input);
      }),
    update: publicProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["novo", "em_analise", "respondido", "rejeitado"]).optional(),
        orcamento: z.string().optional(),
        prazo: z.string().optional(),
        observacoes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updateOrcamento(id, data);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return deleteOrcamento(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
