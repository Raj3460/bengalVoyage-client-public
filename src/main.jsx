import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Router/Router.jsx";
import AuthProvider from "./Firebase/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./Component/Sheard/ThemeProvider/ThemeProvider.jsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
     <ThemeProvider>
  <div className="font_urbanist max-w-6xl mx-auto">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
        </ThemeProvider>
  </StrictMode>
);
