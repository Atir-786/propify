"use client";
import { signOutUser } from "@/action/user";
import Link from "next/link";
import { useState } from "react";
function NavbarClient({ user, signOut }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleSignOut = async () => {
    try {
      await signOut(); // Call the server action here
      console.log("User successfully signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <button
        className="md:hidden block focus:outline-none text-gray-300"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Navigation Links */}
      <ul
        className={`absolute md:relative top-[61px] left-0 w-full md:w-auto md:top-0 md:left-0 bg-gray-900 md:bg-transparent text-center md:flex md:items-center md:space-x-6 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <li className="border-b md:border-none border-gray-700">
          <Link
            href={user ? "/sell" : "/login"}
            className="block md:inline-block hover:text-gray-300 transition duration-300 py-2 md:py-0"
          >
            Sell property
          </Link>
        </li>
        <li className="border-b md:border-none border-gray-700">
          <Link
            href={user ? "/my-properties" : "/login"}
            className="block md:inline-block hover:text-gray-300 transition duration-300 py-2 md:py-0"
          >
            My properties
          </Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link
                href="/login"
                className="block md:inline-block hover:text-gray-300 transition duration-300 py-2 md:py-0"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="block md:inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleSignOut}
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300"
            >
              Logout
            </button>
            {/* <form
              action={async () => {
                "use server";
                await signOut();
              }}
              className="block md:inline-block"
            >
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300"
              >
                Logout
              </button>
            </form> */}
          </li>
        )}
      </ul>
    </>
  );
}

export default NavbarClient;
