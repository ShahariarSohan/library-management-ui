import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import type { IBook } from "@/interfaces/book.interface";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { useBorrowBookMutation } from "@/redux/apis/borrowApi";
import { format } from "date-fns";
import { useNavigate } from "react-router";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: IBook | null;
}

const UpdateBookDialog = ({ open, onOpenChange, book }: IProps) => {
  const navigate = useNavigate();
  
  const form = useForm();

  const [borrowBook] = useBorrowBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    
      if (!book?._id) return;
      const borrowData = {
        book: book._id,
        dueDate: data.dueDate,
        quantity: Number(data.quantity),
      };
     
    try {
      if ( borrowData.quantity<=book?.copies) {
        await borrowBook(borrowData).unwrap();
        toast.success("Book Borrowed successfully");
        onOpenChange(false);
        form.reset();
        navigate("/borrow-summary");
       }
      else {
       return  toast.error("Your given copies not available");
       }

    } catch {
      console.error("There is an error")
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Borrow Your Book</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Borrow your book
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="quantity"
              rules={{ required: "Quantity is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      className="my-2"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              rules={{ required: "Due date is required" }}
              render={({ field }) => (
                <FormItem className="flex flex-col my-4">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button className="mt-2 bg-gray-500" type="submit">
                Borrow
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBookDialog;
