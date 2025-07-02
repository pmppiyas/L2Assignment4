import { createBrowserRouter } from "react-router";
import RootLayout from "@/Layout/RootLayout";
import HomePage from "@/_Components/Home/HomePage";
import AddBook from "@/_Components/Books/AddBook";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "add-book",
        Component: AddBook,
      },
    ],
  },
]);

export default router;
