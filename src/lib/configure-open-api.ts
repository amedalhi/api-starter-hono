import type { AppOpenAPI } from "@/lib/types.js";

import { Scalar } from "@scalar/hono-api-reference";

import packageJSON from "../../package.json" with { type: "json" };

const configureOpenAPI = function (app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: packageJSON.version,
    },
  });

  app.get("/reference", 
    Scalar({ 
      url: "/doc",
      theme: "moon",
      layout: "classic",
      pageTitle: 'Awesome API',
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      }
    }));
};

export default configureOpenAPI;
