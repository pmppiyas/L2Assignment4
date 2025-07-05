import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Pencil, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import toast from "react-hot-toast";
import type { IBook } from "@/types";
import { useGetBooksQuery, useUpdateBookMutation } from "@/Redux/Api/baseApi";
import BookPagination from "./BookPagination";
import BookDelete from "./BookDelete";
import FilterBook from "./FilterBook";

export function AllBooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("ALL");
  const [sortOption, setSortOption] = useState("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [limit] = useState(10);
  const [page, setPage] = useState(1);

  const [editBook, setEditBook] = useState<IBook | null>(null);
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filterObj: Record<string, string> = {};
  if (genreFilter !== "ALL") filterObj.genre = genreFilter;
  if (searchTerm) filterObj.search = searchTerm;

  const queryParams = {
    filter: {
      search: searchTerm,
      genre: genreFilter !== "ALL" ? genreFilter : undefined,
    },
    sortBy: sortOption,
    sort: sortOrder,
    limit,
    page,
  };

  const { data, isLoading } = useGetBooksQuery(queryParams);
  const books = data?.data || [];
  const pagination = data?.pagination;

  const [updateBook] = useUpdateBookMutation();

  const handleEditClick = (book: IBook) => {
    setEditBook(book);
    setOpenPopover(book.isbn);
  };

  const handleSave = async () => {
    if (!editBook) return;
    const bookId = editBook.id || editBook._id;

    try {
      await updateBook({ id: bookId, data: editBook }).unwrap();
      toast.success("Book updated successfully");
      setEditBook(null);
      setOpenPopover(null);
    } catch {
      toast.error("Failed to update book");
    }
  };

  const handleCancel = () => {
    setEditBook(null);
    setOpenPopover(null);
  };

  const handleReset = () => {
    setSearchTerm("");
    setGenreFilter("ALL");
    setSortOption("title");
    setSortOrder("asc");
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-68px)] flex items-center justify-center">
        Loading books...
      </div>
    );
  }
  const GENRES = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ];

  return (
    <div className="min-h-[calc(100vh-68px)] w-full flex flex-col items-center">
      <h2 className="font-medium text-2xl my-4">
        All <span className="text-blue-500">Books</span>
      </h2>

      {/* Filters */}
      <FilterBook
        sortOption={sortOption}
        setSortOption={setSortOption}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleReset={handleReset}
      ></FilterBook>

      {/* Book Table */}
      <div className="w-full overflow-x-auto px-4">
        <table className="max-w-7xl mx-auto rounded-md ">
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
            {books.map((book: IBook) => (
              <tr key={book.isbn}>
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
                <td className="p-3 space-x-2 flex items-center">
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
                      {editBook?.isbn === book.isbn && (
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

                                {key === "genre" ? (
                                  <Select
                                    value={editBook.genre}
                                    onValueChange={(value) =>
                                      setEditBook((prev) =>
                                        prev ? { ...prev, genre: value } : prev
                                      )
                                    }
                                  >
                                    <SelectTrigger className="col-span-2 h-8 w-full">
                                      <SelectValue placeholder="Select genre" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {GENRES.map((genre) => (
                                        <SelectItem key={genre} value={genre}>
                                          {genre.replace("_", " ")}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Input
                                    id={key}
                                    type={
                                      key === "copies" || key === "isbn"
                                        ? "number"
                                        : "text"
                                    }
                                    value={
                                      editBook[
                                        key as keyof IBook
                                      ]?.toString() ?? ""
                                    }
                                    disabled={key === "isbn"}
                                    onChange={(e) =>
                                      setEditBook((prev) =>
                                        prev
                                          ? {
                                              ...prev,
                                              [key]:
                                                key === "copies" ||
                                                key === "isbn"
                                                  ? Number(e.target.value)
                                                  : e.target.value,
                                            }
                                          : prev
                                      )
                                    }
                                    className="col-span-2 h-8"
                                  />
                                )}
                              </div>
                            ))}
                            <div className="flex gap-2 mt-2">
                              <Button className="flex-1" onClick={handleSave}>
                                Save
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

                  <Button size="sm" disabled={!book.available}>
                    <BookOpen size={16} className="mr-1" />
                    Borrow
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <BookPagination
        pagination={pagination}
        setPage={setPage}
      ></BookPagination>

      {/* Delete Confirm Modal */}
      {confirmDeleteId && (
        <BookDelete
          bookId={confirmDeleteId}
          setConfirmDeleteId={setConfirmDeleteId}
        ></BookDelete>
      )}
    </div>
  );
}
