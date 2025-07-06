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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const book = {
      title,
      author,
      genre,
      isbn: parseInt(isbn) || 0,
      description,
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
      toast.success("📘 Book added successfully");
      setTimeout(() => navigate("/books"), 1000);
    } catch (error) {
      let issues;
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data &&
        typeof error.data.message === "object" &&
        error.data.message !== null &&
        "issues" in error.data.message
      ) {
        issues = error.data.message.issues;
      }
      const extractedErrors: Record<string, string> = {};

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

  const renderError = (field: string) =>
    fieldErrors[field] && (
      <div className="text-sm text-red-500 flex items-center gap-1 mt-1">
        <span>⚠️</span>
        <span>{fieldErrors[field]}</span>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-68px)] w-full flex flex-col items-center justify-center">
      <h2 className="font-medium text-2xl my-4">
        Add A <span className="text-blue-500">Book</span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 py-4 px-4 lg:w-4/5 md:grid grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      >
        {/* Title */}
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
          />
          {renderError("title")}
        </div>

        {/* Author */}
        <div className="space-y-1">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
          />
          {renderError("author")}
        </div>

        {/* Genre */}
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
          {renderError("genre")}
        </div>

        {/* ISBN */}
        <div className="space-y-1">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            type="number"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Enter ISBN"
          />
          {renderError("isbn")}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description"
          />
          {renderError("description")}
        </div>

        {/* Copies */}
        <div className="space-y-1">
          <Label htmlFor="copies">Copies</Label>
          <Input
            id="copies"
            type="number"
            value={copies}
            onChange={(e) => setCopies(e.target.value)}
            placeholder="Number of copies"
          />
          {renderError("copies")}
        </div>

        {/* General form error */}
        {fieldErrors.form && (
          <div className="col-span-3 text-center mt-2">
            <p className="text-sm text-red-500 flex items-center justify-center gap-1">
              <span>⚠️</span>
              <span>{fieldErrors.form}</span>
            </p>
          </div>
        )}

        {/* Submit Button */}
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
