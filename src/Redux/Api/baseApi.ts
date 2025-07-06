import type { IBook } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://lv2-assignment03.vercel.app/api",
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ filter, ...rest }) => {
        const params = {
          ...rest,
          filter: typeof filter === "object" ? JSON.stringify(filter) : filter,
        };
        return { url: "/books", params };
      },
      providesTags: ["Book"],
    }),

    bookById: builder.query({
      query: (id) => `/books/${id}`,
    }),

    addBook: builder.mutation({
      query: (newBook: IBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Book"],
    }),

    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),

    // Borrow Book
    borrowBook: builder.mutation({
      query: (data) => ({
        url: "/borrow",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),

    allBorrows: builder.query({
      query: () => "/borrow",
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useAllBorrowsQuery,
  useBookByIdQuery,
} = baseApi;
