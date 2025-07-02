import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "@/Redux/features/book/bookSlice";

export const store = configureStore({
  reducer: {
    book: bookReducer,
  },
});
