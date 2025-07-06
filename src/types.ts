import { ObjectId } from "mongodb";

export interface IBook {
  _id?: ObjectId;
  title: string;
  author: string;
  genre: string;
  isbn: number;
  description: string;
  copies: number;
  available?: boolean;
}
