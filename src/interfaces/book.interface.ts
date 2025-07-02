export interface IBook {
  title: string;
  author: string;
  genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
  imgUrl: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}
