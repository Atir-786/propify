"use server";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { CredentialsSignin } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
const login = async (email: string, password: string) => {
  // "use server";
  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    console.log("hohoo");
    return someError.cause;
  }
  // redirect("/");
};
const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    await connectDB();

    console.log("After connection");
    // existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      // throw new Error("user already exist");
      return "user already exists";
    await User.create({ firstName, lastName, email, password });
    console.log("user created succesfully");
  } catch (error) {
    return "An error occurred during registration";
  }
  // redirect("/login");
};
const signOutUser = async () => {
  await signOut();
};
const handleWishlist = async (id) => {
  const session = await auth();
  const u = session?.user;
  if (!u) {
    // return redirect("/login");

    return { success: false, message: "Not authenticated", wishlist: [] };
  }

  await connectDB();
  const user = await User.findOne({ email: u.email });

  if (!user) {
    return { success: false, message: "User not found", wishlist: [] };
  }

  const isInWishlist = user.wishlist.includes(id);

  if (isInWishlist) {
    // Remove from wishlist
    user.wishlist = user.wishlist.filter(
      (propId) => propId.toString() !== id.toString()
    );
    await user.save();
    return {
      success: true,
      message: "Removed from wishlist",
      wishlist: user.wishlist,
    };
  } else {
    // Add to wishlist
    user.wishlist.push(id);
    await user.save();
    return {
      success: true,
      message: "Added to wishlist",
      wishlist: user.wishlist,
    };
  }
};
// const handleWishlist = async (id) => {
//   const session = await auth();
//   const u = session?.user;
//   if (!u) {
//     redirect("/login");
//   }
//   await connectDB();
//   const user = await User.findOne({ email: u.email });

//   if (!user) {
//     return "User not found";
//   }

//   const isInWishlist = user.wishlist.includes(id);

//   if (isInWishlist) {
//     // Remove only the selected property from wishlist
//     user.wishlist = user.wishlist.filter(
//       (propId) => propId.toString() !== id.toString()
//     );
//     await user.save();
//     console.log("Removed from wishlist");
//     return "Removed from wishlist";
//   } else {
//     // Add to wishlist
//     user.wishlist.push(id);
//     await user.save();
//     console.log("Added to wishlist");
//     return "Added to wishlist";
//   }
// };
export { register, login, signOutUser, handleWishlist };
