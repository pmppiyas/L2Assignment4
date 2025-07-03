import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "@/Redux/features/book/bookSlice";
import { baseApi } from "@/Redux/Api/baseApi";

export const store = configureStore({
  reducer: {
    books: bookReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
