import { type Attributes, type FunctionComponent } from "react";

export type Page = {
  path: string;
  props: Attributes | null | undefined;
  component: FunctionComponent<unknown>;
};

export type SingleRoute = {
  path: string;
  exact?: boolean;
  getComponent: () => Promise<{ default: FunctionComponent<unknown> }>;
};
