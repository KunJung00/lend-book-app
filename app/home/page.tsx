"use client";

import BookTable from "@/components/BookTable";
import BookView from "@/components/BookView";
import { useEffect, useState } from "react";

type Book = {
  bid: number;
  name: string;
  description: string;
  image: string;
};
type User = {
  uid: number;
  username: string;
}

export default function Lendbook() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/book");
        const data: Book[] = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      {/* <h1>For you</h1> */}
      {/* <div className="bg-slate-200 mb-10">
        <div className="flex gap-10 pt-5 overflow-x-auto mx-24">
          {books.map((book) => (
            <div key={book.bid}>
              <BookView name={book.name} image={book.image} />
            </div>
          ))}
        </div>
      </div> */}
      <BookView books={books} />
      <div className="mx-24 grid grid-cols-3 gap-x-32 gap-y-8">
        {books.map((book) => (
          <BookTable key={book.bid} book={book} />
        ))}
      </div>
    </div>
  );
}
