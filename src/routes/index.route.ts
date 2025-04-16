import { createRouter } from "@/lib/create-app.js";
import jsonContent from "@/openapi/helpers/json-content.js";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/utils/http-status-codes.js";
import createMessageObjectSchema from "@/openapi/helpers/create-message-object.js";

const router = createRouter().openapi(
  createRoute({
    tags: ["index"],
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Hi, this is an API!"),
        "My API Index"
      ),
    },
  }),
  (c) => {
    return c.json(
      {
        message: "My API",
      },
      HttpStatusCodes.OK
    );
  }
);

export default router;
