import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddBookMutation } from "@/Redux/Api/baseApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState("");

  const [addBook, { isLoading }] = useAddBookMutation();

  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    const book = {
      title: title,
      author: author,
      genre,
      isbn: parseInt(isbn) || 0,
      description: description,
      copies: parseInt(copies) || 0,
    };

    try {
      await addBook(book).unwrap();
      setTitle("");
      setAuthor("");
      setGenre("");
      setIsbn("");
      setDescription("");
      setCopies("");
      setFieldErrors({});
      toast.success("Book added successfully");
      navigate("/books");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Book added unsuccessfull");
      const issues = error?.data?.message?.issues;
      const extractedErrors = {};

      if (Array.isArray(issues)) {
        issues.forEach((issue) => {
          const field = issue.path?.[0];
          if (field) extractedErrors[field] = issue.message;
        });
        setFieldErrors(extractedErrors);
      } else {
        setFieldErrors({ form: "Something went wrong. Please try again." });
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] w-full flex flex-col items-center justify-center">
      <h2 className="font-medium text-2xl my-4">
        Add A <span className="text-blue-500">Book</span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 py-4 px-4 lg:w-4/5 md:grid grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      >
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
          />
          {fieldErrors.title && (
            <p className="text-sm text-red-500">{fieldErrors.title}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
          />
          {fieldErrors.author && (
            <p className="text-sm text-red-500">{fieldErrors.author}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="genre">Genre</Label>
          <Select value={genre} onValueChange={(value) => setGenre(value)}>
            <SelectTrigger className="col-span-2 h-8 w-full">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              {[
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
              ].map((genreOption) => (
                <SelectItem key={genreOption} value={genreOption}>
                  {genreOption.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldErrors.genre && (
            <p className="text-sm text-red-500">{fieldErrors.genre}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            type="number"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Enter ISBN"
          />
          {fieldErrors.isbn && (
            <p className="text-sm text-red-500">{fieldErrors.isbn}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description"
          />
          {fieldErrors.description && (
            <p className="text-sm text-red-500">{fieldErrors.description}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="copies">Copies</Label>
          <Input
            id="copies"
            type="number"
            value={copies}
            onChange={(e) => setCopies(e.target.value)}
            placeholder="Number of copies"
          />
          {fieldErrors.copies && (
            <p className="text-sm text-red-500">{fieldErrors.copies}</p>
          )}
        </div>

        {fieldErrors.form && (
          <div className="col-span-3 text-center">
            <p className="text-sm text-red-500">{fieldErrors.form}</p>
          </div>
        )}

        <div className="col-span-3 flex justify-center">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding Book..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddBookPage;
