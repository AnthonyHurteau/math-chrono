import { ComponentType, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import "@/root.css";
import "@/i18n";
import ScrollToHashRef from "@/components/ScrollToHashRef";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
        <HelmetProvider>
          <Router>
            <ScrollToHashRef />
            <App />
          </Router>
        </HelmetProvider>
    </StrictMode>
  );
}

export default render;
