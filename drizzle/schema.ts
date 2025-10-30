import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const construcoes = mysqlTable("construcoes", {
  id: int("id").autoincrement().primaryKey(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  descricao: text("descricao").notNull(),
  cliente: varchar("cliente", { length: 255 }).notNull(),
  localizacao: varchar("localizacao", { length: 255 }).notNull(),
  pavimentos: int("pavimentos"),
  apartamentos: int("apartamentos"),
  area: int("area"),
  fotoUrl: varchar("fotoUrl", { length: 500 }),
  status: mysqlEnum("status", ["planejamento", "em_andamento", "concluida"]).default("em_andamento").notNull(),
  progresso: int("progresso").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Construcao = typeof construcoes.$inferSelect;
export type InsertConstrucao = typeof construcoes.$inferInsert;

export const projetos = mysqlTable("projetos", {
  id: int("id").autoincrement().primaryKey(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  descricao: text("descricao").notNull(),
  cliente: varchar("cliente", { length: 255 }).notNull(),
  localizacao: varchar("localizacao", { length: 255 }).notNull(),
  pavimentos: int("pavimentos"),
  apartamentos: int("apartamentos"),
  area: int("area"),
  fotoUrl: varchar("fotoUrl", { length: 500 }),
  status: mysqlEnum("status", ["planejamento", "em_andamento", "concluida"]).default("em_andamento").notNull(),
  progresso: int("progresso").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Projeto = typeof projetos.$inferSelect;
export type InsertProjeto = typeof projetos.$inferInsert;

export const reformas = mysqlTable("reformas", {
  id: int("id").autoincrement().primaryKey(),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  descricao: text("descricao").notNull(),
  cliente: varchar("cliente", { length: 255 }).notNull(),
  localizacao: varchar("localizacao", { length: 255 }).notNull(),
  area: int("area"),
  fotoUrl: varchar("fotoUrl", { length: 500 }),
  status: mysqlEnum("status", ["planejamento", "em_andamento", "concluida"]).default("em_andamento").notNull(),
  progresso: int("progresso").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Reforma = typeof reformas.$inferSelect;
export type InsertReforma = typeof reformas.$inferInsert;

export const settings = mysqlTable("settings", {
  id: int("id").autoincrement().primaryKey(),
  primaryColor: varchar("primaryColor", { length: 7 }).default("#2D5F4F").notNull(),
  secondaryColor: varchar("secondaryColor", { length: 7 }).default("#000000").notNull(),
  accentColor: varchar("accentColor", { length: 7 }).default("#4CAF50").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Settings = typeof settings.$inferSelect;
export type InsertSettings = typeof settings.$inferInsert;

export const imagens = mysqlTable("imagens", {
  id: int("id").autoincrement().primaryKey(),
  projetoId: int("projetoId").notNull(),
  tipo: mysqlEnum("tipo", ["construcao", "projeto", "reforma"]).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  titulo: varchar("titulo", { length: 255 }),
  ordem: int("ordem").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Imagem = typeof imagens.$inferSelect;
export type InsertImagem = typeof imagens.$inferInsert;

export const depoimentos = mysqlTable("depoimentos", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  cargo: varchar("cargo", { length: 255 }).notNull(),
  empresa: varchar("empresa", { length: 255 }).notNull(),
  texto: text("texto").notNull(),
  avaliacao: int("avaliacao").notNull(),
  fotoUrl: varchar("fotoUrl", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Depoimento = typeof depoimentos.$inferSelect;
export type InsertDepoimento = typeof depoimentos.$inferInsert;

export const orcamentos = mysqlTable("orcamentos", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  telefone: varchar("telefone", { length: 20 }).notNull(),
  tipo: mysqlEnum("tipo", ["construcao", "reforma", "projeto"]).notNull(),
  assunto: varchar("assunto", { length: 255 }).notNull(),
  descricao: text("descricao").notNull(),
  localizacao: varchar("localizacao", { length: 255 }),
  area: int("area"),
  orcamento: varchar("orcamento", { length: 50 }),
  prazo: varchar("prazo", { length: 100 }),
  status: mysqlEnum("status", ["novo", "em_analise", "respondido", "rejeitado"]).default("novo").notNull(),
  observacoes: text("observacoes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Orcamento = typeof orcamentos.$inferSelect;
export type InsertOrcamento = typeof orcamentos.$inferInsert;
