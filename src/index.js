import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";    // ✅ FIXED import
import { SnackbarProvider } from "notistack";        // ✅ for toast notifications

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* ✅ Wrap App inside SnackbarProvider */}
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Optional: measure performance
reportWebVitals();
