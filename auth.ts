import NextAuth, { CredentialsSignin } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import { User } from "@/models/User";
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
          id: user._id.toString(),
          role: user.role,
        };
        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Include user ID in the token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        // Assuming id is part of the user object
      }
      return token;
    },
    async session({ session, token }) {
      // Pass user ID to the session
      if (token?.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === "google" || "github") {
        try {
          const { email, name } = user;
          console.log("hiii");
          await connectDB();
          const [firstName, ...lastNameParts] = name
            ? name.split(" ")
            : ["unknown"];
          const lastName = lastNameParts.join(" ") || "";
          const alreadyUser = await User.findOne({ email });
          if (!alreadyUser) {
            console.log(firstName, lastName, email);
            await User.create({ firstName, lastName, email, role: "user" });
          }
          // Attach MongoDB _id to the user object
          user.id = alreadyUser._id.toString(); // Ensure the ID is a string
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
