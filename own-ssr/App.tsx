import React from "react";

import { Page } from "./utils/types";

import { OwnSSRContext } from "./context";

type Props = {
  page: Page;
};

export default function App({ page }: Props) {
  const [activePage, setActivePage] = React.useState(page);
  return (
    <OwnSSRContext.Provider value={{ activePage, setActivePage }}>
      {React.createElement(activePage.component, activePage.props)}
    </OwnSSRContext.Provider>
  );
}
