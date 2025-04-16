import type { RouteHandler } from "@hono/zod-openapi";
import type {
  ListRoute,
  CreateRoute,
  GetOneRoute,
  PatchRoute,
  RemoveRoute,
} from "./chips.routes";
import db from "@/db";
import { eq } from "drizzle-orm";
import { chips } from "@/db/schema";
import * as HttpStatusCodes from "@/utils/http-status-codes";
import * as HttpStatusPhrases from "@/utils/http-status-phrases";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/lib/constants";

export const list: RouteHandler<ListRoute> = async (c) => {
  // c.var.logger.info("This is a custom log");
  const allChips = await db.query.chips.findMany();
  return c.json(allChips);
};

export const create: RouteHandler<CreateRoute> = async (c) => {
  const chip = c.req.valid("json");
  const [inserted] = await db.insert(chips).values(chip).returning();
  return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: RouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const chip = await db.query.chips.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!chip) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(chip, HttpStatusCodes.OK);
};

export const patch: RouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");

  const [chip] = await db
    .update(chips)
    .set(updates)
    .where(eq(chips.id, id))
    .returning();

  if (!chip) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(chip, HttpStatusCodes.OK);
};

export const remove: RouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const result = await db.delete(chips).where(eq(chips.id, id));

  if (result.rowsAffected === 0) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
