import express from "express";
import { createServer as createViteServer } from "vite";
import { serverRenderRoutes } from "./own-ssr/ssr/server-render-routes";
import { getAllRoutes } from "./own-ssr/utils/get-routes";

async function createServer() {
  const app = express();

  await getAllRoutes();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", serverRenderRoutes({ vite }));

  app.listen("3000", () => console.log("🚀 Listening on port 3000"));
}

createServer();
