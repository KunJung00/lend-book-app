import { useState } from "react";
import ModalDeleteLend from "./ModalDeleteLend";

type BookBorrowed = {
  uid: number;
  bid: number;
  name: string;
  description: string;
  image: string;
};
type BookTableProps = {
  book: BookBorrowed; // รับ props เป็นวัตถุ book
};

const BookStore = ({ book }: BookTableProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-gray-400 shadow-lg rounded-xl mb-7">
      <div
        key={book.bid}
        className=" flex flex-col justify-center items-center p-4"
      >
        <img
          src={book.image}
          alt=""
          className="image-class shadow-gray-400 shadow-lg rounded-md mb-2"
        />
        <button
          type="button"
          onClick={() => {
            console.log(book.bid);

            setIsOpen(true);
          }}
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-red-500 hover:bg-red-100 focus:outline-none focus:bg-red-100 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-800/30 dark:hover:text-red-400 dark:focus:bg-red-800/30 dark:focus:text-red-400"
        >
          Return the book
        </button>
        <ModalDeleteLend
          key={book.bid}
          isVisible={isOpen}
          onClose={() => setIsOpen(false)}
          borrowBook={book}
        />
      </div>
    </div>
  );
};

export default BookStore