import NextAuth, { CredentialsSignin } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import { User } from "@/models/User";
import { trusted } from "mongoose";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        // if (!email || !password) {
        //   console.log("buddy enter both");
        //   throw new CredentialsSignin("please provide both email and password");
        // }
        await connectDB();
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
          throw new CredentialsSignin({ cause: "invalid email or password" });
        }
        if (!user.password) {
          throw new CredentialsSignin({ cause: "invalid email or password" });
        }
        const isMatched = password === user.password;
        if (!isMatched) {
          throw new CredentialsSignin({ cause: "password did not match" });
        }
        const userData = {
          firstName: user.firstName,
          lastName: user.lasttName,
          email: user.email,
          id: user._id,
        };
        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name } = user;
          console.log("hiii");
          await connectDB();
          const [firstName, ...lastNameParts] = name.split(" ");
          const lastName = lastNameParts.join(" ") || "";
          const alreadyUser = await User.findOne({ email });
          if (!alreadyUser) {
            console.log(firstName, lastName, email);
            await User.create({ firstName, lastName, email });
          }
          return true;
        } catch (error) {
          console.error("error while creating user", error);
          return false;
        }
      }
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
  secret: process.env.AUTH_SECRET,
});
