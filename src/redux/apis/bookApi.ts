import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-system-tau-azure.vercel.app",
  }),
  tagTypes: ["book"],
  endpoints: (build) => ({
    getAllBooks: build.query({
      query: () => "/api/books",
      providesTags: ["book"],
    }),
    addBook: build.mutation({
      query: (body) => ({
        url: "/api/books",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddBookMutation, useGetAllBooksQuery } = bookApi;