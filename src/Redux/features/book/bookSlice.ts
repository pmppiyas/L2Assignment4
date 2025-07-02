import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
});

export const {} = bookSlice.actions;

export default bookSlice.reducer;
