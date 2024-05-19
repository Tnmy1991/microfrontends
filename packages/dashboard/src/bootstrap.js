import { createApp } from "vue";
import Dashboard from "./components/Dashboard";

const mount = (elem) => {
  const app = createApp(Dashboard);

  app.mount(elem);
};

if (process.env.NODE_ENV === "development") {
  const elem = document.querySelector("#_dashboard_root");
  if (elem) mount(elem);
}

export { mount };
