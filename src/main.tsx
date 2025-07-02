import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Router/router.ts";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Provider } from "react-redux";
import { store } from "@/Redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
