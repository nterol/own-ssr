import { createContext, useContext } from "react";
import { SingleRoute, type Page } from "./utils/types";

//export const routes = await getAllRoutes();

// const routes = [
//   {
//     path: "/",
//     getComponent: () => import("../src/pages/index.tsx"),
//     exact: true,
//   },
//   {
//     path: "/my-component",
//     getComponent: () => import("../src/pages/my-component.tsx"),
//     exact: false,
//   },
//   {
//     path: "/inside/outside",
//     getComponent: () => import("../src/pages/inside/outside.tsx"),
//     exact: false,
//   },
// ];

type OwnSSRContext = {
  activePage: Page;
  setActivePage: (page: Page) => void;
};

export const OwnSSRContext = createContext<OwnSSRContext>({} as OwnSSRContext);

async function getServerData(to) {
  return await fetch(`data/${to}`).then((d) => d.json());
}

export function useOwnContext() {
  const { setActivePage } = useContext(OwnSSRContext);

  return {
    navigate: async (to: string) => {
      const [props, { default: component }] = await Promise.all([
        getServerData(to),
        (
          global.ownSSR_Routes?.find(
            (route) => route.path === to
          ) as SingleRoute
        ).getComponent(),
      ]);

      setActivePage({ path: to, component, props });
      history.pushState(null, "", to);
    },
  };
}
