import Link from "next/link";
import React from "react";
import { signOut } from "@/auth";
import { auth } from "@/auth";
import NavbarClient from "../client/NavbarClient";
import { signOutUser } from "@/action/user";
// import { getSession } from "next-auth/react";
const Navbar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          Propify
        </Link>
        <NavbarClient user={user} signOut={signOutUser} />
      </div>
    </nav>
    // <nav className="bg-gray-900 text-white shadow-lg">
    //   <div className="container mx-auto flex justify-between items-center py-4 px-6">
    //     {/* Logo */}
    //     <Link href="/" className="text-xl font-bold hover:text-gray-300">
    //       Propify
    //     </Link>

    //     {/* Navigation Links */}
    //     <ul className="flex items-center space-x-6">
    //       <li>
    //         <Link
    //           href={user ? "/sell" : "/login"}
    //           className="hover:text-gray-300 transition duration-300"
    //         >
    //           Sell property
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           href={user ? "/my-properties" : "/login"}
    //           className="hover:text-gray-300 transition duration-300"
    //         >
    //           My properties
    //         </Link>
    //       </li>
    //       {!user ? (
    //         <>
    //           {/* Links for Unauthenticated Users */}
    //           <li>
    //             <Link
    //               href="/login"
    //               className="hover:text-gray-300 transition duration-300"
    //             >
    //               Login
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               href="/register"
    //               className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
    //             >
    //               Register
    //             </Link>
    //           </li>
    //         </>
    //       ) : (
    //         // Logout Button for Authenticated Users
    //         <form
    //           action={async () => {
    //             "use server";
    //             await signOut();
    //           }}
    //         >
    //           <button
    //             type="submit"
    //             className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300"
    //           >
    //             Logout
    //           </button>
    //         </form>
    //       )}
    //     </ul>
    //   </div>
    // </nav>
  );
};

export default Navbar;
