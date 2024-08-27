"use client";

import { useEffect, useState } from "react";

interface BookViewProps {
  books: Book[];
}
type Book = {
  bid: number;
  name: string;
  description: string;
  image: string;
};
const BookView = ({ books }: BookViewProps) => {
  // const BookView = ({ name, image }: BookViewProps) => {
  //   return (
  //     <div
  //       className="flex bg-white shadow-gray-400 shadow-lg rounded-xl mb-7"
  //       style={{ width: "410px" }}
  //     >
  //       <div className="p-7 ">
  //         <img
  //           src={image}
  //           alt=""
  //           className="image-class h-52 rounded-md shadow-gray-400 shadow-md"
  //         />
  //       </div>
  //       <div className="pt-14 pb-7 pr-3">
  //         <h2 className=" line-clamp-2">{name}</h2>
  //       </div>
  //     </div>
  //   );
  // };
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 3000); // Auto slide every 3 seconds
    return () => clearInterval(interval);
  }, [books.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? books.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  return (
    <div className="relative">
      <div className="relative overflow-hidden w-full min-h-96 rounded-lg ">
        <div
          className=" flex transition-transform duration-700 "
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {books.map((book, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex justify-center items-center"
            >
              <div className="w-screen flex-auto h-full flex justify-center items-center">
                <div
                  className="flex  shadow-gray-400 shadow-lg rounded-xl mb-7 "
                  style={{ width: "1010px" }}
                >
                  <div className="p-7">
                    <img
                      src={book.image}
                      alt=""
                      className="image-class h-52 rounded-md shadow-gray-400 shadow-md"
                    />
                  </div>
                  <div className="pt-14 pb-7 pr-3">
                    <h2 className="line-clamp-2">{book.name}</h2>
                    <p className="line-clamp-6 text-gray-600">{book.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute inset-y-0 left-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none rounded-l-lg dark:text-white"
      >
        <svg
          className="shrink-0 size-5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
        <span className="sr-only">Previous</span>
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute inset-y-0 right-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none rounded-r-lg dark:text-white"
      >
        <svg
          className="shrink-0 size-5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
        <span className="sr-only">Next</span>
      </button>

      {/* Pagination */}
      <div className="flex justify-center absolute bottom-3 left-0 right-0 space-x-2">
        {books.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer size-3 border rounded-full ${
              currentIndex === index
                ? "bg-blue-700 border-blue-700"
                : "border-gray-400 dark:border-neutral-600"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );

};

export default BookView;
