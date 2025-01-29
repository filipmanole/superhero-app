import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import { ThemeProvider } from "./providers";

// const getApiKey = () => {
//   const apiKey = localStorage.getItem("apiKey");
//   if (!apiKey) return null;
//   return JSON.parse(apiKey);
// };

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
