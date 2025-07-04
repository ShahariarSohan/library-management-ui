import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/books",
  }),
  tagTypes: ["Book", "Books"], 
  endpoints: (build) => ({
    
    getAllBooks: build.query({
      query: () => "/",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((book: { _id: string }) => ({
                type: "Book" as const,
                id: book._id,
              })),
              { type: "Books" },
            ]
          : [{ type: "Books" }],
    }),

    
    getSingleBook: build.query({
      query: (bookId) => `/${bookId}`,
      providesTags: ( bookId) => [{ type: "Book", id: bookId }],
    }),

   
    addBook: build.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Books" }],
    }),

    
    updateBook: build.mutation({
      query: ({ bookId, data }) => ({
        url: `/${bookId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ( { bookId }) => [
        { type: "Book", id: bookId },
        { type: "Books" },
      ],
    }),

   
    deleteBook: build.mutation({
      query: (bookId) => ({
        url: `/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ( bookId) => [
        { type: "Book", id: bookId },
        { type: "Books" },
      ],
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
