"use client";
import BookStore from "@/components/BookStore";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

export default function Page() {
  
  type BookBorrowed = {
    uid: number;
    bid: number;
    name: string;
    description: string;
    image: string;
  };
  type User = {
    uid: number;
    username: string;
  };
 
  // const [user, setUser] = useState<User | undefined>(undefined);
  const [books, setBooks] = useState<BookBorrowed[]>([]);
  const user = useRef<User | undefined>(undefined);
    const router = useRouter();



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const dataUser = localStorage.getItem("dataUser");

        if (dataUser) {
          // const userJson: User = JSON.parse(dataUser);
          user.current = JSON.parse(dataUser.toString());
          // setUser(userJson);
          
          // console.log(testuser.current?.username);
        }else{
          
          router.push("/home");
        }
        console.log(dataUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/lend/getByUid/" + user.current?.uid
        );
        const data: BookBorrowed[] = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchBooks();
  }, []);


  return (
    <div className="grid grid-cols-5 gap-4 justify-items-center mt-8">
      {books.map((book) => (
        <BookStore book={book} ></BookStore>
      ))}
    </div>
  );
}
