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
    getSingleBook: build.query({
      query: (bookId) => `/${bookId}`,
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
      query: ({ bookId, data }) => ({
        url: `/${bookId}`,
        method: "PUT",
        body: data,
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

export const {
  useAddBookMutation,
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
