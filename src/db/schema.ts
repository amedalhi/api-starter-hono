import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const chips = sqliteTable("chips", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date()
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export const selectChipsSchema = createSelectSchema(chips);

export const insertChipsSchema = createInsertSchema(chips, {
  name: (schema) => schema.min(1).max(100),
  description: (schema) => schema.min(2).max(1000),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const patchChipsSchema = insertChipsSchema.partial();
