import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-system-tau-azure.vercel.app/borrow",
  }),
  tagTypes: ["borrow"],
  endpoints: (build) => ({
    getBorrowedBooks: build.query({
      query: () => "/",
      providesTags: ["borrow"],
    }),

    borrowBook: build.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowedBooksQuery } = borrowApi;
