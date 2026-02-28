import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import "./index.css"; // IMPORTANT: make sure Tailwind loads

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </ThemeProvider>
    {/* Toast outside providers */}
    <Toaster position="top-right" reverseOrder={false} />
  </React.StrictMode>
);
