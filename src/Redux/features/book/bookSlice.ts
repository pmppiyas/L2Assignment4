import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBook } from "@/types";
import type { RootState } from "@/Redux/store";

interface InitialState {
  book: IBook[];
  filter: "all";
}
const initialState: InitialState = {
  book: [
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      genre: "Technology",
      ISBN: 9780201616224,
      description:
        "A modern classic that guides software developers on how to think, design, and code pragmatically.",
      copies: 5,
      available: true,
    },
  ],
  filter: "all",
};

type DraftBook = Pick<
  IBook,
  "title" | "author" | "genre" | "ISBN" | "description" | "copies"
>;

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<DraftBook>) => {
      state.book.push(action.payload);
    },
  },
});

export const { addBook } = bookSlice.actions;
export const selectBooks = (state: RootState) => {
  return state.books.book;
};
export default bookSlice.reducer;
