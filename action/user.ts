"use server";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
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
export { register, login };
