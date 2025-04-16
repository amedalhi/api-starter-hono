//copied from CJ's stoker package
//https://github.com/w3cj/stoker/blob/main/src/middlewares/not-found.ts

import type { NotFoundHandler } from "hono";

import { NOT_FOUND } from "@/utils/http-status-codes.js";
import { NOT_FOUND as NOT_FOUND_MESSAGE } from "@/utils/http-status-phrases.js";

const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `${NOT_FOUND_MESSAGE} - ${c.req.path}`,
    },
    NOT_FOUND
  );
};

export default notFound;
