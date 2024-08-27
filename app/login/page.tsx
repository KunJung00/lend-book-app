"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [response, setResponse] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
      try {
        const res = await fetch("/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (data.message == "Login successful") {
          router.push("/home");
          console.log(data.result[0]);
          
          localStorage.setItem("dataUser",JSON.stringify(data.result[0]));
        } else {
          setResponse(data.message.json());
          
        }
      } catch (error) {
        console.error("Error:", error);
        setResponse("An error occurred");
      }
    } ;
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div
        className="flex shadow-black drop-shadow-2xl"
        style={{ height: "90%", width: "90%" }}
      >
        {/* Left section */}
        <div
          className="flex flex-col justify-center items-center w-3/5 p-8"
          style={{ background: "#91DDCF" }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/023/366/105/original/back-to-school-happy-pupils-children-learning-computer-reading-books-concept-png.png" // Replace with your local image path
            alt="Lovebird illustration"
            width={400}
          />
          <h2 className="text-white text-xl font-semibold mb-2">
            Discover the Joy of Reading!
          </h2>
          <p className="text-white text-sm text-center">
            This advertisement encourages both reading and the option to borrow
            books from your store, highlighting the benefits and convenience.
          </p>
        </div>

        {/* Right section */}
        <div className="flex flex-col justify-center items-center h-auto w-2/5 bg-white p-8">
          <h1 className="text-3xl font-bold mb-8">Books</h1>
          <h2 className="text-xl mb-6">Login</h2>

          <form className="w-full max-w-sm" onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                type="username"
                id="username"
                onChange={(event) => setUserName(event.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-red-500">{response}</p>

            <button
              type="submit"
              className="w-full justify-center py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-400 text-white hover:bg-teal-600 focus:outline-none focus:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none"
            >
              Sign in
            </button>
          </form>
          <div className="mt-6">
            Don't have account?{" "}
            <a href="/register" className="text-blue-500 no-underline">
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
