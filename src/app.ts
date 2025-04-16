import createApp from "@/lib/create-app.js";
import configureOpenAPI from "@/lib/configure-open-api.js";
//routes
import index from "@/routes/index.route.js";
import chips from "@/routes/chips/chips.index.js";

const app = createApp();

const routes = [index, chips] as const;

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
