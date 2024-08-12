import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Lists from "./Lists";
import Card from "./Card/Card";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Lists />
  </StrictMode>
);
