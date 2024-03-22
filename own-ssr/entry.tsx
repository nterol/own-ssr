import React from "react";
import ReactDOM from "react-dom";
import { FunctionComponent, createElement, useState } from "react";
import { OwnSSRContext } from "./context";

type Props = {
  page: {
    component: FunctionComponent<unknown>;
    props: unknown;
  };
};

export function App({ page }: Props) {
  const [activePage, setActivePage] = useState(page);

  return (
    <OwnSSRContext.Provider value={{ activePage, setActivePage }}>
      {createElement(page.component, page?.props ?? {})}
    </OwnSSRContext.Provider>
  );
}

interface WindowWithProps extends Window {
  OWN_SSR_PROPS: unknown;
}

const hydrate = async () => {
  console.log("HYDRATE");

  const activePage = global.ownSSR_Routes?.find(
    (route) => route.path === location.pathname
  );

  const { default: component } = await activePage.getComponent();

  ReactDOM.hydrate(
    <App
      page={{
        props: (window as unknown as WindowWithProps).OWN_SSR_PROPS,
        path: window.location.pathname,
        component,
      }}
    />,
    document.getElementById("root")
  );
};

if (!import.meta.env.SSR) {
  hydrate();
}
