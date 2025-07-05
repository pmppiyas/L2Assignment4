import { createBrowserRouter } from "react-router";
import RootLayout from "@/Layout/RootLayout";
import HomePage from "@/_Components/Home/HomePage";
import AddBook from "@/_Components/Books/AddBook";
import { AllBooksPage } from "@/_Components/Books/AllBooksPage";
import AllBorrows from "@/_Components/Books/Borrow/AllBorrows";

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
        path: "books",
        Component: AllBooksPage,
      },
      {
        path: "add-book",
        Component: AddBook,
      },
      {
        path: "borrow-summary",
        Component: AllBorrows,
      },
    ],
  },
]);

export default router;
