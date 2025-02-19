"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { signOutUser } from "@/action/user";
import { User } from "next-auth"; // Import User type

// Define Navbar Props Type
interface NavbarProps {
  user?: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  // console.log(user);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      console.log("User successfully signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-gray-300"
        >
          Propify
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {user?.role === "admin" && (
            <Link
              href={user ? "/dashboard" : "/login"}
              className="hover:text-gray-300"
            >
              Dashboard
            </Link>
          )}
          <Link
            href={user ? "/sell" : "/login"}
            className="hover:text-gray-300"
          >
            Sell Property
          </Link>
          <Link
            href={user ? "/my-properties" : "/login"}
            className="hover:text-gray-300"
          >
            My Properties
          </Link>

          {!user ? (
            <>
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-white text-2xl">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 text-white shadow-md p-4 flex flex-col space-y-3">
          <Link
            href={user ? "/dashboard" : "/login"}
            onClick={toggleMenu}
            className="hover:text-gray-300"
          >
            Dashboard
          </Link>
          <Link
            href={user ? "/sell" : "/login"}
            onClick={toggleMenu}
            className="hover:text-gray-300"
          >
            Sell Property
          </Link>
          <Link
            href={user ? "/my-properties" : "/login"}
            onClick={toggleMenu}
            className="hover:text-gray-300"
          >
            My Properties
          </Link>

          {!user ? (
            <>
              <Link
                href="/login"
                onClick={toggleMenu}
                className="hover:text-gray-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={toggleMenu}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
