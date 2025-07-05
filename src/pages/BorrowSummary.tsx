import type { IBorrowSummary } from "@/interfaces/borrowSummary.interface";
import { useGetBorrowedBooksQuery } from "@/redux/apis/borrowApi";
import { BeatLoader } from "react-spinners";

interface IProps {
  book: IBorrowSummary;
  totalQuantity: number;
}

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowedBooksQuery(undefined);
  const borrowedBooks = data?.data || [];

  if (isError)
    return (
      <h1 className="text-xl font-bold text-red-500 text-center my-5">
        Something went wrong ...
      </h1>
    );
  if (borrowedBooks.length === 0) {
    return (
      <h1 className="text-xl font-bold text-red-500 text-center my-52">
      No Book Summary Available...
    </h1>
    )
  }
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center">Borrowed Book Summary</h1>
      {isLoading && (
        <div className="flex items-center justify-center">
          <BeatLoader color="#4B5563" size={10} />
        </div>
      )}
      <div className="overflow-x-auto mt-10 p-4">
        <div className="min-w-full bg-white rounded-md shadow-md overflow-hidden mb-10">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-white tracking-wider">
                  Book Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white tracking-wider">
                  ISBN
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white tracking-wider">
                  Total Quantity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {!isLoading &&
                !isError &&
                borrowedBooks?.map((book: IProps, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {book?.book?.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                      {book?.book?.isbn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                      {book?.totalQuantity}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BorrowSummary;
