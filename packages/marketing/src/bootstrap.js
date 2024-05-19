import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";

import App from "./App";

const mount = (elem, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });
  if (onNavigate) history.listen(onNavigate);

  ReactDOM.render(<App history={history} />, elem);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) history.push(nextPathname);
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const elem = document.querySelector("#_marketing_root");
  if (elem) mount(elem, { defaultHistory: createBrowserHistory() });
}

export { mount };
