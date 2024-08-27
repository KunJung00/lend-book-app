// components/Dropdown.tsx
"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const allPath = ["/home","/bookstore"];

  const handleSelect = (option: string) => {
    setIsOpen(false);
  };
  const handleLogOut = () => {
    localStorage.removeItem("dataUser");
    window.location.reload();
  };

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)} className="dropdown-toggle">
        <svg
          className="hs-collapse-open:hidden flex-shrink-0 w-8 h-8" // Adjusted w-8 and h-8 in className as well
          xmlns="http://www.w3.org/2000/svg"
          width="48" // Increased size
          height="48" // Increased size
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" x2="21" y1="6" y2="6" />
          <line x1="3" x2="21" y1="12" y2="12" />
          <line x1="3" x2="21" y1="18" y2="18" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
          {allPath
            .filter((option) => option !== pathName)
            .map((option) => (
              <div>
                <button
                  className="w-full py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:focus:bg-white/20 dark:focus:text-white text-black"
                  onClick={() => {
                    handleSelect(option), router.push(option);
                  }}
                >
                  {option.substring(1)}
                </button>
                <div className="px-2">
                  <hr className=" border-gray-300" />
                </div>
              </div>
            ))}

          <button
            className="w-full py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:focus:bg-white/20 dark:focus:text-white"
            onClick={() => {
              handleSelect("logout"), handleLogOut();
            }}
          >
            logout
          </button>
        </ul>
      )}
      <style jsx>{`
        .dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-toggle {
          padding: 10px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Dropdown;
