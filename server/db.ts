import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, construcoes, projetos, reformas, InsertConstrucao, InsertProjeto, InsertReforma, settings, InsertSettings } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Construcoes queries
export async function getConstrucoes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(construcoes).orderBy(desc(construcoes.createdAt));
}

export async function createConstrucao(data: InsertConstrucao) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(construcoes).values(data);
}

export async function updateConstrucao(id: number, data: Partial<InsertConstrucao>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(construcoes).set(data).where(eq(construcoes.id, id));
}

export async function deleteConstrucao(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(construcoes).where(eq(construcoes.id, id));
}

// Projetos queries
export async function getProjetos() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(projetos).orderBy(desc(projetos.createdAt));
}

export async function createProjeto(data: InsertProjeto) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(projetos).values(data);
}

export async function updateProjeto(id: number, data: Partial<InsertProjeto>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(projetos).set(data).where(eq(projetos.id, id));
}

export async function deleteProjeto(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(projetos).where(eq(projetos.id, id));
}

// Reformas queries
export async function getReformas() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reformas).orderBy(desc(reformas.createdAt));
}

export async function createReforma(data: InsertReforma) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(reformas).values(data);
}

export async function updateReforma(id: number, data: Partial<InsertReforma>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(reformas).set(data).where(eq(reformas.id, id));
}

export async function deleteReforma(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(reformas).where(eq(reformas.id, id));
}

// Settings queries
export async function getSettings() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(settings).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateSettings(data: Partial<InsertSettings>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getSettings();
  if (existing) {
    return db.update(settings).set(data).where(eq(settings.id, existing.id));
  } else {
    return db.insert(settings).values(data as InsertSettings);
  }
}
