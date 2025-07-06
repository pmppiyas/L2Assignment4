import { useEffect, useState } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  BookOpen,
  Pencil,
  Trash,
  ReceiptText,
  ChevronDownIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import toast from "react-hot-toast";
import type { IBook } from "@/types";
import {
  useBorrowBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
} from "@/Redux/Api/baseApi";
import BookPagination from "./BookPagination";
import BookDelete from "./BookDelete";
import FilterBook from "./FilterBook";
import loadImg from "@/assets/loading.svg";
import { useNavigate } from "react-router-dom";

interface FilterObj {
  genre?: string;
  search?: string;
}

export function AllBooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("ALL");
  const [sortOption, setSortOption] = useState("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [limit] = useState(10);
  const [page, setPage] = useState(1);

  const [editBook, setEditBook] = useState<IBook | null>(null);
  const [openPopover, setOpenPopover] = useState<number | null>(null);

  const [borrowId, setBorrowId] = useState("");
  const [deuDate, setDeuDate] = useState<Date | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [borrowBook, setBorrowBook] = useState<IBook | null>(null);
  const [openCalender, setOpenCalender] = useState<boolean>(false);
  const [openBorrowPop, setOpenBorrowPop] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(true);

  const filterObj: FilterObj = {};
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
  const [borrowBookMutation] = useBorrowBookMutation();

  const navigate = useNavigate();

  const handleEditClick = (book: IBook) => {
    setEditBook(book);
    setOpenPopover(book.isbn);
  };

  const handleSave = async () => {
    if (!editBook) return;

    const bookId = editBook._id?.toString() || editBook.isbn.toString();

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
    setBorrowBook(null);
  };

  const handleBorrowBook = (book: IBook) => {
    setBorrowBook(book);
    setBorrowId(book._id?.toString() || book.isbn.toString());
    setOpenBorrowPop(book.isbn);
  };

  const handleBorrowSubmit = async () => {
    try {
      if (!borrowId || !deuDate || quantity <= 0) {
        toast.error("Please fill all fields correctly.");
        return;
      }

      await borrowBookMutation({
        book: borrowId,
        quantity,
        dueDate: deuDate.toISOString(),
      }).unwrap();

      toast.success("Book borrowed successfully");
      navigate("/borrow-summary");
      setBorrowBook(null);
      setOpenBorrowPop(null);
      setQuantity(1);
      setDeuDate(undefined);
    } catch (err) {
      toast.error((err as any)?.data?.error || "Failed to borrow book");
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setGenreFilter("ALL");
    setSortOption("title");
    setSortOrder("asc");
    setPage(1);
  };

  const handleSortOrderChange = (value: "asc" | "desc") => {
    setSortOrder(value);
  };
  const handleDetails = (id: string): void => {
    navigate(`/books/${id}`);
    console.log(id);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || showLoader) {
    return (
      <div className="min-h-[calc(100vh-68px)] flex items-center justify-center">
        <img src={loadImg} alt="Loading..." />
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
        setSortOrder={handleSortOrderChange}
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleReset={handleReset}
      />

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
                  <Button
                    className="bg-blue-500"
                    size="sm"
                    onClick={() => {
                      if (book._id) {
                        handleDetails(book._id.toString());
                      }
                    }}
                  >
                    <ReceiptText size={16} className="mr-1" />
                    Details
                  </Button>
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
                            {(
                              [
                                ["Title", "title"],
                                ["Author", "author"],
                                ["Genre", "genre"],
                                ["ISBN", "isbn"],
                                ["Description", "description"],
                                ["Copies", "copies"],
                              ] as [string, keyof IBook][]
                            ).map(([label, key]) => (
                              <div
                                key={key}
                                className="grid grid-cols-3 items-center gap-2"
                              >
                                <Label htmlFor={key}>{label}</Label>

                                {key === "genre" ? (
                                  <Select
                                    value={editBook ? editBook.genre : ""}
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
                                      editBook &&
                                      typeof editBook[key] !== "undefined"
                                        ? String(
                                            editBook[key as keyof IBook] as
                                              | string
                                              | number
                                          )
                                        : ""
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
                    onClick={() =>
                      setConfirmDeleteId(
                        book._id?.toString() || book.isbn.toString()
                      )
                    }
                  >
                    <Trash size={16} className="mr-1" />
                    Delete
                  </Button>

                  {/* Borrow  */}
                  <Popover
                    open={openBorrowPop === book.isbn}
                    onOpenChange={(open) => {
                      if (!open) {
                        setOpenBorrowPop(null);
                        setBorrowBook(null);
                      }
                    }}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        size="sm"
                        onClick={() => handleBorrowBook(book)}
                        disabled={!book.available}
                      >
                        <BookOpen size={16} className="mr-1" />
                        Borrow
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96">
                      {borrowBook?.isbn === book.isbn && (
                        <div className="grid gap-4">
                          <h4 className="text-center font-semibold">
                            Borrow Book
                          </h4>

                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-2">
                              <Label htmlFor="borrowId">ISBN</Label>
                              <Input
                                id="borrowId"
                                value={book.isbn}
                                disabled
                                className="col-span-2 h-8"
                              />
                            </div>

                            {/* Quantity */}
                            <div className="grid grid-cols-3 items-center gap-2">
                              <Label htmlFor="quantity">Quantity</Label>
                              <Input
                                id="quantity"
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) =>
                                  setQuantity(Number(e.target.value))
                                }
                                className="col-span-2 h-8"
                              />
                            </div>

                            {/* Due Date */}
                            <div className="grid grid-cols-3 items-center gap-2">
                              <Label htmlFor="dueDate">Due Date</Label>

                              <Popover
                                open={openCalender}
                                onOpenChange={setOpenCalender}
                              >
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    id="date"
                                    className="w-48 justify-between font-normal"
                                  >
                                    {deuDate
                                      ? deuDate.toLocaleDateString()
                                      : "Select date"}
                                    <ChevronDownIcon />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto overflow-hidden p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={deuDate}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                      setDeuDate(date);
                                      setOpenCalender(false);
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 mt-2">
                              <Button
                                className="flex-1"
                                onClick={handleBorrowSubmit}
                              >
                                Confirm
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <BookPagination pagination={pagination} setPage={setPage} />

      {/* Delete Confirm Modal */}
      {confirmDeleteId && (
        <BookDelete
          bookId={confirmDeleteId}
          setConfirmDeleteId={setConfirmDeleteId}
        />
      )}
    </div>
  );
}
