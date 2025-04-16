import { pinoHttp } from "pino-http";
import { requestId } from "hono/request-id";
import env from "@/env.js";

const defaultOptions = {
  level: env.LOG_LEVEL || "info",
  transport:
    env.NODE_ENV != "production"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        }
      : undefined,
};

const pinoLogger = function (options = defaultOptions) {
  const requestIdMiddleware = requestId();
  const pinoMiddleware = async (c: any, next: () => Promise<void>) => {
    c.env.incoming.id = c.var.requestId;

    await new Promise<void>((resolve) =>
      pinoHttp(options)(c.env.incoming, c.env.outgoing, () => resolve())
    );

    c.set("logger", c.env.incoming.log);

    await next();
  };

  return [requestIdMiddleware, pinoMiddleware];
};

export default pinoLogger();
