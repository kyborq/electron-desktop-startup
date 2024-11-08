import "./assets/index.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
