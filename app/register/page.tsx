"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCon, setPasswordCon] = useState("");

  const [response, setResponse] = useState<string | null>(null);
  const router = useRouter();

  const handleInsertUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username);
    if (password == passwordCon) {
      try {
        const res = await fetch("../api/user/adduser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (data.message == "success") {
          router.push("/home");
        } else {
          setResponse(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        setResponse("An error occurred");
      }
    } else {
      setResponse("Invalid username or password");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div
        className="flex shadow-black drop-shadow-2xl"
        style={{ height: "90%", width: "90%" }}
      >
        {/* Left section */}
        <div className="flex flex-col justify-center items-center w-3/5 bg-green-400 p-8">
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
        <div className="flex flex-col justify-center items-center w-2/5 bg-white p-8">
          <h1 className="text-3xl font-bold mb-8">Books</h1>
          <h2 className="text-xl mb-6">Register</h2>
          <form className="w-full max-w-sm" onSubmit={handleInsertUser}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                type="text"
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
            <div className="mb-4">
              <label htmlFor="passwordCon" className="block text-gray-700">
                Password Confirm
              </label>
              <input
                type="password"
                id="passwordCon"
                onChange={(event) => setPasswordCon(event.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full justify-center py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-400 text-white hover:bg-green-600 focus:outline-none focus:bg-green-600 disabled:opacity-50 disabled:pointer-events-none"
            >
              Register
            </button>
          </form>
          <p className="text-red-500">{response}</p>
          <div className="mt-6">
            You have account?{" "}
            <a href="/login" className="text-blue-500 no-underline">
              sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
