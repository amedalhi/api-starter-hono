import type { OpenAPIHono } from "@hono/zod-openapi";
import type pino from "pino";

declare module "hono" {
  interface ContextVariableMap {
    logger: pino.Logger;
  }
}

export type AppOpenAPI = OpenAPIHono;

import type { z } from "@hono/zod-openapi";
// review ZodUnion, may not need the AnyZodObject

export type ZodSchema =
  | z.ZodUnion<[z.ZodTypeAny, z.ZodTypeAny]>
  | z.AnyZodObject
  | z.ZodArray<z.AnyZodObject>;
