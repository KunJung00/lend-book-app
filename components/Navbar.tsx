"use client";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

type User = {
  uid: number;
  username: string;
};

const Navbar = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const dataUser = localStorage.getItem("dataUser");
    if (dataUser) {
      const userJson: User = JSON.parse(dataUser);
      setUser(userJson);
    }
  }, []);



  return (
    <nav
      className="min-w-fit flex items-center justify-between p-6 lg:px-8"
      style={{ background: "#AAD7D9" }}
    >
      <div className="flex">
        <img
          src="https://cdn-icons-png.freepik.com/512/167/167756.png"
          alt=""
          width={50}
          className="h-12 w-auto mr-5"
        />
        <p className="text-5xl font-bold">BOOKS</p>
      </div>

      {user ? (
        <Dropdown />
      ) : (
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/login"
            className="text-sm font-semibold leading-6 text-gray-900 no-underline"
          >
            Log in
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
