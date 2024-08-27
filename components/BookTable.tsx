"use client";
import { useState } from "react";
import ModalLend from "./ModalLend";
type Book = {
  bid: number;
  name: string;
  description: string;
  image: string;
};
type BookTableProps = {
  book: Book; // รับ props เป็นวัตถุ book
};

const BookTable = ({ book }: BookTableProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <div className="pr-3">
        <img
          src={book.image}
          alt=""
          style={{ height: "140px", width: "100px" }}
        />
      </div>
      <div className="w-64 h-36 flex flex-col">
        {book.name}
        <div className="mt-auto">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-auto no-underline py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none"
          >
            Lend
          </button>
        </div>
      </div>
      <ModalLend
        isVisible={isOpen}
        onClose={() => setIsOpen(false)}
        book={book}
      />
    </div>

  );
};
export default BookTable;
