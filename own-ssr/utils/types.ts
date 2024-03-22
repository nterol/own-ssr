import { FunctionComponent } from "react";

export type Page = {
  path: string;
  props: unknown;
  component: unknown;
};

export type SingleRoute = {
  path: string;
  exact?: boolean;
  getComponent: () => Promise<{ default: FunctionComponent<unknown> }>;
};
