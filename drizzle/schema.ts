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
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Reforma = typeof reformas.$inferSelect;
export type InsertReforma = typeof reformas.$inferInsert;