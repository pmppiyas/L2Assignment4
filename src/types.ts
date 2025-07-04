export interface IBook {
  title: string;
  author: string;
  genre: string;
  isbn: number;
  description: string;
  copies: number;
  available?: boolean;
}
