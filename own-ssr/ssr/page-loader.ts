import { type ViteDevServer } from "vite";
import fs from "fs";
import path from "path";

type Props = {
  url: string;
  vite: ViteDevServer;
};

type PageLoaderResult = {
  template: string;
  props: unknown;
  App: unknown;
  Page: unknown;
};

const urlToFilePath = (url: string) =>
  url[url.length - 1] === "/" ? `${url}index.tsx` : `${url}.tsx`;

export async function pageLoader({
  url,
  vite,
}: Props): Promise<PageLoaderResult> {
  let template = fs.readFileSync(
    path.resolve(process.cwd(), "index.html"),
    "utf-8"
  );

  template = await vite.transformIndexHtml(url, template);

  const [{ default: Page, getServerSideProps }, { App }] = await Promise.all([
    vite.ssrLoadModule(`/src/pages/${urlToFilePath(url)}`),
    vite.ssrLoadModule("/own-ssr/entry.tsx"),
  ]);

  const { props } =
    typeof getServerSideProps === "function" &&
    getServerSideProps.constructor.name === "AsyncFunction"
      ? await getServerSideProps()
      : { props: {} };

  return { template, props, Page, App };
}
