import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Layout from "./Layout/Layout";
import Simple from "./Rive/Delete";
import Delete from "./Rive/Delete";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Layout />
  </StrictMode>
);
