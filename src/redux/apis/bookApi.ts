import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/books",
  }),
  tagTypes: ["book"],
  endpoints: (build) => ({
    getAllBooks: build.query({
      query: () => "/",
      providesTags: ["book"],
    }),
    addBook: build.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["book"],
    }),
    updateBook: build.mutation({
      query: ({ bookId, ...body }) => ({
        url: `/${bookId}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: build.mutation({
      query: (bookId) => ({
        url: `/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const { useAddBookMutation, useGetAllBooksQuery,useDeleteBookMutation,useUpdateBookMutation } = bookApi;
