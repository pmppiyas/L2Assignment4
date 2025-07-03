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

export function AllBooksPage() {
  const books = useAppSelector(selectBooks);
  const [editBook, setEditBook] = useState<IBook | null>(null);

  const handleEditClick = (book: IBook) => {
    setEditBook(book);
  };

  const handleSave = () => {
    if (!editBook) return;

    const updatedBook = {
      ...editBook,
      available: editBook.copies > 0,
    };

    console.log("📘 Edited Book Data:", updatedBook);

    setEditBook(null);
  };

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
              <tr key={book.ISBN}>
                <td className="p-3 font-medium">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.genre}</td>
                <td className="p-3">{book.ISBN}</td>
                <td className="p-3">{book.copies}</td>
                <td className="p-3">
                  {book.available ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-500 font-semibold">No</span>
                  )}
                </td>
                <td className="p-3 space-x-2 flex items-center">
                  <Popover>
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
                      {editBook && editBook.ISBN === book.ISBN && (
                        <div className="grid gap-4">
                          <h4 className="text-center font-semibold">
                            Edit Book
                          </h4>
                          <div className="grid gap-2">
                            {[
                              ["Title", "title"],
                              ["Author", "author"],
                              ["Genre", "genre"],
                              ["ISBN", "ISBN"],
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
                                    key === "copies" || key === "ISBN"
                                      ? "number"
                                      : "text"
                                  }
                                  value={
                                    editBook[key as keyof IBook]?.toString() ??
                                    ""
                                  }
                                  onChange={(e) =>
                                    setEditBook((prev) =>
                                      prev
                                        ? {
                                            ...prev,
                                            [key]:
                                              key === "copies" || key === "ISBN"
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
                            <Button className="mt-2" onClick={handleSave}>
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => console.log("Delete", book.ISBN)}
                  >
                    <Trash size={16} className="mr-1" />
                    Delete
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => console.log("Borrow", book.ISBN)}
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
    </div>
  );
}
