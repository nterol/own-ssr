import { Glob } from "bun";
import { type SingleRoute } from "./types";

export async function getAllRoutes() {
  if (typeof global.ownSSR_Routes === "object") return;

  const routes: SingleRoute[] = [];

  const glob = new Glob("**/*.tsx");

  for await (const file of glob.scan({
    cwd: "src/pages",
    dot: true,
    onlyFiles: true,
  })) {
    const striped = file.replace(".tsx", "");
    console.log(`../src/page/${file}`);
    const singleRoute = {
      path: `/${striped.replace("index", "")}`,
      getComponent: () => import(`../src/pages/${striped}.tsx`),
      exact: file.includes("index.tsx"),
    };

    routes.push(singleRoute);
  }

  global.ownSSR_Routes = routes;
}
