import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/borrow",
  }),
  tagTypes: ["borrow", "Books", "Book"], 
  endpoints: (build) => ({
    getBorrowedBooks: build.query({
      query: () => "/",
      providesTags: [{ type: "borrow" }],
    }),

    borrowBook: build.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ( arg) => [
        { type: "borrow" as const },
        { type: "Books" as const },
        ...(arg?.book ? [{ type: "Book" as const, id: arg.book }] : []),
      ],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowedBooksQuery } = borrowApi;
