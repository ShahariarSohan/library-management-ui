import Banner from "@/components/banner/Banner";
import BookCard from "@/components/book/BookCard";
import type { IBook } from "@/interfaces/book.interface";
import { useGetAllBooksQuery } from "@/redux/apis/bookApi";

import { BeatLoader } from "react-spinners";
const AllBooks = () => {
  const { data, isLoading, isError } = useGetAllBooksQuery(undefined);
  const books = data?.data || [];

  if (isError)
    return (
      <h1 className="text-xl font-bold text-red-500 text-center my-5">
        Something went wrong ....
      </h1>
    );
    if (books.length === 0) {
      return (
        <h1 className="text-xl font-bold text-red-500 text-center my-5">
          No Books Available...
        </h1>
      );
    }
  return (
    <div>
      <Banner></Banner>
      <h1 className="text-4xl font-bold text-center my-10">
        Discover Your Next Books
      </h1>
      {isLoading && (
        <div className="flex items-center justify-center">
          <BeatLoader color="#4B5563" size={10} />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-5 my-5">
        {!isLoading &&
          !isError &&
          books?.map((book: IBook, idx: number) => (
            <BookCard key={idx} {...book}></BookCard>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
