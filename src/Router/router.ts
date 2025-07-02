import { createBrowserRouter } from "react-router";
import RootLayout from "@/Layout/RootLayout";
import HomePage from "@/_Components/Home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
]);

export default router;
