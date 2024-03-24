import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.tsx";

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

async function hydrate() {
  const { pathname } = window.location;

  console.log({ pathname });

  const { default: component } = await import(
    `/src/pages${
      pathname[pathname.length - 1] === "/" ? "/index" : pathname
    }.tsx`
  );

  console.log({ component });

  const root = document.getElementById("root");
  if (root)
    ReactDOM.hydrateRoot(
      root,
      <React.StrictMode>
        <App page={{ component }} />
      </React.StrictMode>
    );
}

if (!import.meta.env.SSR) {
  hydrate();
}
