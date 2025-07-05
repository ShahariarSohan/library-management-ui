
import type { IBook } from "@/interfaces/book.interface";
import { useDeleteBookMutation } from "@/redux/apis/bookApi";
import { Eye, Pencil, Trash2, BookOpen } from "lucide-react"; 
import toast from "react-hot-toast";
import UpdateBookDialog from "./UpdateBookDialog";
import { useState } from "react";
import BookDetailsDialog from "./BookDetailsDialog";
import BorrowBookDialog from "./BorrowBookDialog";
import Swal from "sweetalert2";

const BookCard = (book: IBook) => {
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [borrowOpen, setBorrowOpen] = useState(false);

  const { title, author, imgUrl, _id }=book
  const [deleteBook]=useDeleteBookMutation()
  const handleDelete = async (_id: string) => {
    
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async(result) => {
        if (result.isConfirmed) {
          const res = await deleteBook(_id).unwrap();
          esponse", res);          
          Swal.fire({
            title: "Deleted!",
            text: "Book has been deleted.",
            icon: "success",
          });
        }
      });     
    } catch (error) {
      toast.error("Book Deletion Failed");
      orm catch block", error);
    }
  }

  

  const handleUpdateDialog = (book: IBook) => {
    setSelectedBook(book);
    setUpdateOpen(true);
  };
  const handleViewDialog = (book: IBook) => {
    setSelectedBook(book);
    setViewOpen(true);
  };
  const handleBorrowDialog = (book: IBook) => {
    setSelectedBook(book);
    setBorrowOpen(true);
  };
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
          <p className="text-gray-600 dark:text-gray-300 mb-4">by {author}</p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            <button onClick={()=>handleViewDialog(book)}
              title="View"
              className="p-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-md transition"
            >
              <Eye className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </button>
            <button
              onClick={() => handleUpdateDialog(book)}
              title="Edit"
              className="p-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-md transition"
            >
              <Pencil className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </button>
            <button
              onClick={() => handleDelete(_id!)}
              title="Delete"
              className="p-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-md transition"
            >
              <Trash2 className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </button>
            <button
              title="Borrow" onClick={()=>handleBorrowDialog(book)}
              className="p-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-md transition"
            >
              <BookOpen className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            </button>
          </div>
        </div>
        <UpdateBookDialog
          open={updateOpen}
          onOpenChange={setUpdateOpen}
          book={selectedBook}
        />
        <BookDetailsDialog
          open={viewOpen}
          onOpenChange={setViewOpen}
          bookId={_id!}
        />
        <BorrowBookDialog
          open={borrowOpen}
          onOpenChange={setBorrowOpen}
          book={selectedBook}
        />

      </div>
    );
};

export default BookCard;
