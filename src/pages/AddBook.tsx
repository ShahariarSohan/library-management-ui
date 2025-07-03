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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useAddBookMutation } from "@/redux/apis/bookApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddBook = () => {
  const navigate = useNavigate();
  const [addBook, { data, isLoading }] = useAddBookMutation();
  console.log("outside", data, isLoading);
  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("inside before response", data);
    const bookData = {
      ...data,
      available: true,
      copies: Number(data.copies),
    };
    try {
      console.log("bookData", bookData);
      const res = await addBook(bookData).unwrap();
      console.log("response", res);
      toast.success("Form Successfully Submitted");
      form.reset();
      navigate("/")
      
    } catch(error) {
      toast.error("Form submission failed");
      console.log("Form catch block",error)
    }
  };

  return (
    <div className="p-5 md:p-0">
      <h1 className="text-3xl font-bold text-center my-5">Add Your Book</h1>
      <div className="sm:max-w-[425px] mx-auto p-5 rounded-md border-2 my-10">
        <div className="sr-only">Fill up your form by book details</div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              rules={{ required: "Author  is required" }}
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
                  <FormMessage />
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
              rules={{ required: "Isbn is required" }}
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
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
              rules={{ required: "Genre is required" }}
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="copies"
              rules={{ required: "Copies should be a number" }}
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button className="mt-2 bg-gray-500" type="submit">
                Add Task
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddBook;
