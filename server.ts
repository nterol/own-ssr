import express from "express";
import { createServer as createViteServer } from "vite";
import { serverSideRouter } from "./own-ssr/ssr/server-side-routing";
import { getAllRoutes } from "./own-ssr/utils/get-routes";
import { get } from "http";
import getServerData from "./own-ssr/ssr/get-server-data";

const base = process.env.BASE || "/";

async function createServer() {
  const app = express();

  await getAllRoutes();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });

  app.use(vite.middlewares);
  app.use("/data/*", getServerData({ vite }));
  app.use("*", serverSideRouter({ vite }));

  app.listen("3000", () => console.log("🚀 Listening on port 3000"));
}

createServer();
