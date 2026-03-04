import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider
    attribute="class"
    defaultTheme="light"
    storageKey="darfood-theme"
    themes={["light", "white", "dark"]}
    value={{ light: "", white: "white", dark: "dark" }}
  >
    <App />
  </ThemeProvider>
);
