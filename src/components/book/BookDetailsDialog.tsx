
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "@/lib/utils";
import { useGetSingleBookQuery } from "@/redux/apis/bookApi";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookId: string | null;
}

const BookDetailsDialog = ({ open, onOpenChange, bookId }: IProps) => {

  const { data } = useGetSingleBookQuery(bookId)
  const book = data?.data||"";
  console.log(book)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col justify-center  ">
        <div className="flex flex-cold md:flex-row items-center gap-5 md:gap-10">
          <div>
            <img
              className="w-40 h-64 object-fill"
              src={book?.imgUrl}
              alt="Book Cover"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 ">
              <h3 className="  font-bold text-gray-600">Isbn:</h3>
              <p className="text-gray-600">{ book?.isbn}</p>
            </div>
            <div className="flex items-center gap-2 ">
              <h3 className="  font-bold text-gray-600">Genre:</h3>
              <p className="text-gray-600">{ book?.genre}</p>
            </div>
            <div className="flex items-center  gap-2">
              <h3 className="  font-bold text-gray-600">
                Copies available:
              </h3>
              <p className="text-gray-600"> { book?.copies?book.copies:0}</p>
            </div>
            <div className="flex items-center  gap-2">
              <h3 className="  font-bold text-gray-600">In Stock:</h3>
              <p className={cn(
                book?.available?"text-green-600":"text-red-600"
              )}> {book?.available ? "Available" : "Unavailable"}</p>
            </div>
          </div>
        </div>
        <DialogHeader>
          <DialogTitle className="text-gray-600 font-bold">{ book?.title}</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-gray-600 dark:text-gray-600 mb-4 font-bold">
            By {book?.author}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4 font-bold">
            Description:
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Description: {book?.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
   
  );
};

export default BookDetailsDialog;
