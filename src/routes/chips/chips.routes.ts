import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/utils/http-status-codes.js";
import jsonContent from "@/openapi/helpers/json-content.js";
import {
  insertChipsSchema,
  patchChipsSchema,
  selectChipsSchema,
} from "@/db/schema";
import jsonContentRequired from "@/openapi/helpers/json-content-required";
import createErrorSchema from "@/openapi/helpers/create-error-schema";
import IdParamsSchema from "@/openapi/helpers/id-params";
import { notFoundSchema } from "@/lib/constants";
import jsonContentOneOf from "@/openapi/helpers/json-content-one-of";
import { ZOD_ERROR_MESSAGES, ZOD_ERROR_CODES } from "@/lib/constants";

const tags = ["chips"];

export const list = createRoute({
  path: "/chips",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectChipsSchema),
      "The list of chips"
    ),
  },
});

export const create = createRoute({
  path: "/chips",
  method: "post",
  request: {
    body: jsonContentRequired(insertChipsSchema, "The chip to create"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectChipsSchema, "Created new chips"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertChipsSchema),
      "The validation error(s)"
    ),
  },
});

export const getOne = createRoute({
  path: "/chips/{id}",
  method: "get",
  request: { params: IdParamsSchema },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectChipsSchema, "The requested chip"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Chip not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertChipsSchema),
      "Invalid id error"
    ),
  },
});

export const patch = createRoute({
  path: "/chips/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(patchChipsSchema, "The chip updates"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectChipsSchema, "The updated chip"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(IdParamsSchema), createErrorSchema(patchChipsSchema)],
      "The validation error(s)"
    ),
  },
});

export const remove = createRoute({
  path: "/chips/{id}",
  method: "delete",
  request: { params: IdParamsSchema },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "The chip has been deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error"
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
