"use client";

import { useEffect, useState } from "react";

interface ModalProps {
  isVisible: boolean; 
  onClose: () => void;
  book:Book;
}
type Book = {
  bid: number;
  name: string;
  description: string;
  image: string;
};
type User = {
  uid: number;
  username: string;
};
async function addLendingBook(uid: number, bid: number) {
  try {
    const res = await fetch("../api/lend/insertLend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, bid }),
    });
    const data = await res.json();
    console.log(data);
    
    if (data.message == "success") {
      console.log("insert success");
    } else {
      console.log("insert fail");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
const ModalLend = ({isVisible,onClose,book}:ModalProps) => {
  if(!isVisible) return null;
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const dataUser = localStorage.getItem("dataUser");
    if (dataUser) {
      const userJson: User = JSON.parse(dataUser);
      setUser(userJson);
      console.log(dataUser);
      console.log(userJson);
    }
  }, []);
  return (
    <div
      id="hs-scale-animation-modal"
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-40"
      role="dialog"
      aria-labelledby="hs-scale-animation-modal-label"
      tabIndex={-1}
    >
      <div className="hs-overlay-animation-target scale-100 opacity-100 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto flex items-center min-h-[calc(100%-3.5rem)]">
        <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
            <h3
              id="hs-scale-animation-modal-label"
              className="font-bold text-gray-800 dark:text-white"
            >
              ยืนยันการยืมหนังสือ
            </h3>
            <button
              type="button"
              className="w-8 h-8 inline-flex justify-center items-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
              aria-label="Close"
              onClick={() => onClose()}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M18 6 6 18"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto text-left">
            <p className="mt-1 text-gray-800 dark:text-neutral-400">
              คุณต้องการยืมหนังสือ "{book.name}" ใช่หรือไม่
            </p>
          </div>
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
              onClick={() => onClose()}
            >
              ไม่
            </button>
            <button
              type="button"
              onClick={()=>{addLendingBook(user?.uid!, book.bid), onClose()}}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
            >
              ใช่
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLend;
