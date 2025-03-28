import { createContext } from 'react';
import booksJson from '../data/books.json';

export interface BookType {
  id: number;
  author: string;
  price: number;
  image: string;
  title: string;
  shortDescription: string;
  description: string;
}

const BooksContext = createContext<BookType[]>(booksJson.books as BookType[]);

export default BooksContext;
