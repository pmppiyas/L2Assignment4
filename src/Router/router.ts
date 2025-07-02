import { createBrowserRouter } from "react-router";
import RootLayout from "@/Layout/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
  },
]);

export default router;
