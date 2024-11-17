import Link from "next/link";
import React from "react";
import { signOut } from "@/auth";
import { auth } from "@/auth";
// import { getSession } from "next-auth/react";
const Navbar = async () => {
  const session = await auth();
  const user = session?.user;
  return (
    // <nav className="">
    //   <Link href="/">Propify</Link>
    //   <ul className="">
    //     {!user ? (
    //       <>
    //         <li>
    //           <Link href="/login">Login</Link>
    //         </li>
    //         <li>
    //           <Link href="/register" className="">
    //             Register
    //           </Link>
    //         </li>
    //       </>
    //     ) : (
    //       <form
    //         action={async () => {
    //           "use server";
    //           await signOut();
    //         }}
    //       >
    //         <button type="submit">Logout</button>
    //       </form>
    //     )}
    //   </ul>
    // </nav>
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          Propify
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6">
          <li>
            <Link
              href={user ? "/sell" : "/login"}
              className="hover:text-gray-300 transition duration-300"
            >
              Sell property
            </Link>
          </li>
          {!user ? (
            <>
              {/* Links for Unauthenticated Users */}
              <li>
                <Link
                  href="/login"
                  className="hover:text-gray-300 transition duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            // Logout Button for Authenticated Users
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300"
              >
                Logout
              </button>
            </form>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
