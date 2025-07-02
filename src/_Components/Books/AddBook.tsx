import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addBook, selectBooks } from "@/Redux/features/book/bookSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import React, { useState } from "react";

function AddBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setgenre] = useState("");
  const [isbn, setIsbn] = useState(0);
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState(0);

  const dispatch = useAppDispatch();
  const book = useAppSelector(selectBooks);
  console.log("From state", book);
  const handleSubmit = (e) => {
    e.preventDefault();

    const book = {
      title,
      author,
      genre,
      isbn,
      description,
      copies,
    };
    dispatch(addBook(book));
  };
  return (
    <div className="min-h-[calc(100vh-68px)] w-full flex flex-col items-center justify-center">
      <h2 className=" font-medium text-2xl my-4">
        Add A <span className="text-blue-500">Book</span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className=" space-y-4 py-4 px-4 lg:w-4/5 md:grid grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      >
        <div className="space-y-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="label">Author</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></Input>
        </div>

        <div className="space-y-1 ">
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            value={genre}
            onChange={(e) => setgenre(e.target.value)}
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="copies">Copies</Label>
          <Input
            id="copies"
            value={copies}
            onChange={(e) => setCopies(e.target.value)}
          ></Input>
        </div>

        <div className="col-span-3 flex  justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default AddBookPage;
