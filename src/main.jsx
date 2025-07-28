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
       {/* <div className="relative z-0  bg-gradient-to-r from-yellow-50 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-900/20 rounded-2xl mb-10  shadow"> */}
          {/* <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-20"></div> */}
          {/* <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-yellow-300 dark:bg-yellow-700 rounded-full opacity-20"></div> */}
          
  <div className="font_urbanist max-w-6xl mx-auto">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
    {/* </div> */}
        </ThemeProvider>
  </StrictMode>
);
