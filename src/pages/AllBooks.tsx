import Banner from "@/components/banner/Banner";
import BookCard from "@/components/book/BookCard";
import { useGetAllBooksQuery } from "@/redux/apis/bookApi";

const AllBooks = () => {
  const { data, isLoading } = useGetAllBooksQuery(undefined)
  console.log(data,isLoading)
  return (
    <div>
      <Banner></Banner>
      <h1 className="text-4xl font-bold text-center my-10">
        Discover Your Next Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-5 my-5">
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
        <BookCard></BookCard>
      </div>
    </div>
  );
};

export default AllBooks;
