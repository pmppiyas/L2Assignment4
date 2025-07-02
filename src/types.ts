export interface IBook {
  title: string;
  author: string;
  genre: string;
  ISBN: number;
  description: string;
  copies: number;
  available?: boolean;
}
