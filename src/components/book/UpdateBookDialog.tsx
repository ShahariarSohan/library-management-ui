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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useUpdateBookMutation } from "@/redux/apis/bookApi";
import type { IBook } from "@/interfaces/book.interface";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: IBook | null;
}

const UpdateBookDialog = ({ open, onOpenChange, book }: IProps) => {
  console.log(book?._id);
  const form = useForm();

  const [updateBook] = useUpdateBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("From field value", data);
    if (!book?._id) return;
    try {
   const res=   await updateBook({
        bookId: book._id,
        data: {
          ...data,
          copies: Number(data.copies),
        },
   }).unwrap();
      console.log("From response",res)
      toast.success("Book updated successfully");
      onOpenChange(false);
    } catch {
      toast.error("Failed to update book");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update Book</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Update your book
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      className="my-2"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      className="my-2"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FICTION">FICTION</SelectItem>
                      <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                      <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                      <SelectItem value="HISTORY">HISTORY</SelectItem>
                      <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                      <SelectItem value="FANTASY">FANTASY</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ImageUrl</FormLabel>
                  <FormControl>
                    <Input
                      className="my-2"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Isbn</FormLabel>
                  <FormControl>
                    <Input
                      className="my-2"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      className="my-2"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button className="mt-2 bg-gray-500" type="submit">
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBookDialog;
