import { type RequestHandler } from "express-serve-static-core";
import { type ViteDevServer } from "vite";
import ReactDOMServer from "react-dom/server";

import { pageLoader } from "./page-loader";
import React, { FunctionComponent } from "react";

type ServerProps = {
  vite: ViteDevServer;
};

export function serverRenderRoutes({ vite }: ServerProps): RequestHandler {
  return async (req, res) => {
    const url = req.originalUrl;

    try {
      const { template, Page, App, props } = await pageLoader({ url, vite });

      const appHTML = ReactDOMServer.renderToString(
        React.createElement(
          App as FunctionComponent<{
            page: { props: unknown; component: unknown; path: string };
          }>,
          {
            page: {
              props,
              component: Page,
              path: url,
            },
          }
        )
      );

      const _HTML = template
        .replace(`<!--app-html-->`, appHTML)
        .replace(
          `</head>`,
          `<script>window.OWN_SSR_PROPS=${JSON.stringify(
            props
          )}</script></head>`
        );

      res
        .status(200)
        .set({ headers: { "Content-Type": "text/html" } })
        .send(_HTML);
    } catch (err) {
      vite.ssrFixStacktrace(err);
      console.error(err);
      res.status(500).end(err.message);
    }
  };
}

//   const { pipe } = ReactDOMServer.renderToPipeableStream(
//     React.createElement(App, {
//       page: { props, path: url, component: Page },
//     }),
//     {
//       bootstrapScriptContent: buildHydrationScripts(props), // buildHydrationScripts as function rendering a stringified script
//       onShellReady() {
//         res.statusCode = 200;
//         res.set({ headers: { "Content-Type": "text/html" } });
//         pipe(res);
//       },
//     }
//   );
