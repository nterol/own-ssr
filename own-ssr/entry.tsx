import { OwnSSRContext } from "./context";
import React, { Attributes } from "react";
import { Page } from "./utils/types";
import { hydrateRoot } from "react-dom/client";

type Props = {
  page: Page;
};

interface WindowWithProps extends Window {
  OWN_SSR_PROPS: Attributes | null | undefined;
}

export function App({ page }: Props) {
  const [activePage, setActivePage] = React.useState(page);
  return (
    <OwnSSRContext.Provider value={{ activePage, setActivePage }}>
      {React.createElement(activePage.component, activePage.props)}
    </OwnSSRContext.Provider>
  );
}

export const hydrate = async () => {
  console.log("HYDRATE");
  const activeRoute = global.ownSSR_Routes.find(
    (route) => route.path === window.location.pathname
  );

  const { default: component } = await activeRoute.getComponent();
  const root = document.getElementById("root");
  if (root)
    hydrateRoot(
      root,
      <App
        page={{
          props: (window as unknown as WindowWithProps).OWN_SSR_PROPS,
          path: window.location.pathname,
          component,
        }}
      />
    );
};

// So this is never called. Hydration just does not work atm,
// switching to modern vite way to handle things.
//  checkout ongoing work on branch feat/vite-ssr
if (!import.meta.env.SSR) {
  hydrate();
}
