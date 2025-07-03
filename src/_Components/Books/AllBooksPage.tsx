/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { selectBooks } from "@/Redux/features/book/bookSlice";
import { useAppSelector } from "@/Redux/hook";
import { BookOpen, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import type { IBook } from "@/types";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
} from "@/Redux/Api/baseApi";
import toast from "react-hot-toast";

export function AllBooksPage() {
  const { data } = useGetBooksQuery(undefined);
  const books = data?.data;
  const [updateBook, { isLoading, isSuccess }] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  const [editBook, setEditBook] = useState<IBook | null>(null);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleEditClick = (book: IBook) => {
    setEditBook(book);
    setOpenPopover(book.isbn);
  };

  const handleSave = async () => {
    if (!editBook) return;

    const bookId = editBook.id || editBook._id;

    const updatedBook = {
      ...editBook,
    };

    try {
      const response = await updateBook({
        id: bookId,
        data: updatedBook,
      }).unwrap();

      toast.success("Book updated successfully");
      setEditBook(null);
      setOpenPopover(null);
    } catch (error) {
      //   console.error("❌ Update failed:", error);
      toast.error("Failed to update book");
    }
  };

  const handleCancel = () => {
    setEditBook(null);
    setOpenPopover(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete book");
    }
  };

  if (isLoading || !books) {
    return (
      <div className="min-h-[calc(100vh-68px)] w-full flex items-center justify-center">
        <div>Loading books...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-68px)] w-full flex flex-col items-center">
      <h2 className="font-medium text-2xl my-4">
        All <span className="text-blue-500">Books</span>
      </h2>

      <div className="w-full overflow-x-auto">
        <table className="max-w-7xl mx-auto rounded-md">
          <thead className="bg-slate-100 dark:bg-slate-800 text-left text-sm font-semibold">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Genre</th>
              <th className="p-3">ISBN</th>
              <th className="p-3">Copies</th>
              <th className="p-3">Available</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700 text-sm">
            {books.map((book) => (
              <tr key={book.ISBN || book._id}>
                <td className="p-3 font-medium">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.genre}</td>
                <td className="p-3">{book.isbn}</td>
                <td className="p-3">{book.copies}</td>
                <td className="p-3">
                  {book.available ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-500 font-semibold">No</span>
                  )}
                </td>
                <td className="p-3 space-x-2 flex items-center ">
                  <Popover
                    open={openPopover === book.isbn}
                    onOpenChange={(open) => {
                      if (!open) {
                        setOpenPopover(null);
                        setEditBook(null);
                      }
                    }}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClick(book)}
                      >
                        <Pencil size={16} className="mr-1" />
                        Edit
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96">
                      {editBook && editBook.isbn === book.isbn && (
                        <div className="grid gap-4">
                          <h4 className="text-center font-semibold">
                            Edit Book
                          </h4>
                          <div className="grid gap-2">
                            {[
                              ["Title", "title"],
                              ["Author", "author"],
                              ["Genre", "genre"],
                              ["ISBN", "isbn"],
                              ["Description", "description"],
                              ["Copies", "copies"],
                            ].map(([label, key]) => (
                              <div
                                key={key}
                                className="grid grid-cols-3 items-center gap-2"
                              >
                                <Label htmlFor={key}>{label}</Label>
                                <Input
                                  id={key}
                                  type={
                                    key === "copies" || key === "isbn"
                                      ? "number"
                                      : "text"
                                  }
                                  value={
                                    editBook[key as keyof IBook]?.toString() ??
                                    ""
                                  }
                                  disabled={key === "isbn"}
                                  onChange={(e) =>
                                    setEditBook((prev) =>
                                      prev
                                        ? {
                                            ...prev,
                                            [key]:
                                              key === "copies" || key === "isbn"
                                                ? Number(e.target.value)
                                                : e.target.value,
                                          }
                                        : prev
                                    )
                                  }
                                  className="col-span-2 h-8"
                                />
                              </div>
                            ))}
                            <div className="flex gap-2 mt-2">
                              <Button className="flex-1" onClick={handleSave}>
                                Save Changes
                              </Button>
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={handleCancel}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setConfirmDeleteId(book._id)}
                  >
                    <Trash size={16} className="mr-1" />
                    Delete
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => console.log("Borrow", book.ISBN || book._id)}
                    disabled={!book.available}
                  >
                    <BookOpen size={16} className="mr-1" />
                    Borrow
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-xl w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-sm mb-6">
              Are you sure you want to delete this book?
            </p>
            <div className="flex justify-between gap-3">
              <Button
                variant="destructive"
                onClick={() => {
                  handleDelete(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
              >
                Yes, Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => setConfirmDeleteId(null)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
