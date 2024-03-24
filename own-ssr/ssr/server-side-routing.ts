import fs from "fs";
import { type Request, type Response } from "express";
import path from "path";
// import { fileURLToPath } from "url";
import { type ViteDevServer } from "vite";
import urlToFilePath from "../utils/url-to-file-path";

//const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function serverSideRouter({ vite }: { vite: ViteDevServer }) {
  return async (req: Request, res: Response) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(
        path.resolve(process.cwd(), "index.html"),
        "utf-8"
      );

      template = await vite.transformIndexHtml(url, template);

      const [{ default: page, getServerSideProps }, { render }] =
        await Promise.all([
          vite.ssrLoadModule(`/src/pages/${urlToFilePath(url)}`),
          vite.ssrLoadModule("/own-ssr/entry-server.tsx"),
        ]);

      const { props } = (await getServerSideProps?.({ url })) ?? {};

      const rendered = render({ page, props, url });

      const html = template
        .replace("<!--app-head-->", rendered.head ?? "")
        .replace("<!--app-body-->", rendered.body ?? "")
        .replace(
          "<!--app-script-->",
          `<script type="module" src="/src/pages${urlToFilePath(
            url
          )}"></script>`
        );

      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (error) {
      vite?.ssrFixStacktrace(error);
      console.log(error.stack);
      res.status(500).end(error.stack);
    }
  };
}
