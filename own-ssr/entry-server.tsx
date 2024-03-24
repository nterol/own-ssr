import React, { type FunctionComponent } from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";

export function render({ page: Page, props, url }) {
  const html = ReactDOMServer.renderToString(
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

  return { head: `<title>Own SSR</title>`, body: html };
}
