
import type { IBook } from "@/interfaces/book.interface";
import { useDeleteBookMutation } from "@/redux/apis/bookApi";
import { Eye, Pencil, Trash2, BookOpen } from "lucide-react"; 
import toast from "react-hot-toast";
const BookCard = ({ title, author, imgUrl, _id }:IBook) => {
  console.log("mongodb Id",_id)
  const [deleteBook]=useDeleteBookMutation()
  const handleDelete = async(_id:string) => {
    try {
      
      const res = await deleteBook(_id).unwrap();
      console.log("response", res);
      toast.success("Book Deleted Successfully ");
     
    } catch (error) {
      toast.error("Book Deletion Failed");
      console.log("Form catch block", error);
    }
  }
    return (
      // or use react-icons if preferred

      <div className="bg-gray-100 dark:bg-gray-900 rounded-md shadow-md hover:shadow-gray-500 transition duration-300  w-full overflow-hidden">
        {/* Book Image */}
        <img
          className="w-full h-64 object-fill"
          src={imgUrl}
          alt="Book Cover"
        />

        {/* Book Info */}
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            by {author}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            <button
              title="View"
              className="p-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-md transition"
            >
              <Eye className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </button>
            <button
              title="Edit"
              className="p-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-md transition"
            >
              <Pencil className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </button>
            <button onClick={()=>handleDelete(_id!)}
              title="Delete"
              className="p-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-md transition"
            >
              <Trash2 className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </button>
            <button
              title="Borrow"
              className="p-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-md transition"
            >
              <BookOpen className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </button>
          </div>
        </div>
      </div>
    );
};

export default BookCard;
