import { OpenAPIHono } from "@hono/zod-openapi";
import serveFavicon from "@/middleware/serve-favicon.js";
import notFound from "@/middleware/not-found.js";
import onError from "@/middleware/on-error.js";
import pinoLogger from "@/middleware/pino-logger.js";
import defaultHook from "@/openapi/default-hook.js";
import { AppOpenAPI } from "./types";

export const createRouter = function () {
  return new OpenAPIHono({
    strict: false,
    defaultHook,
  });
};

const createApp = function () {
  const app = new OpenAPIHono({
    strict: false,
  });
  app.use(...pinoLogger);
  app.use(serveFavicon("🥔"));
  app.notFound(notFound);
  app.onError(onError);

  return app;
};

export default createApp;

export function createTestApp(router: AppOpenAPI) {
  return createApp().route("/", router);
}
