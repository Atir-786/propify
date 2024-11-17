import React from "react";
import Link from "next/link";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { login } from "@/action/user";
import { signIn, auth } from "@/auth";
import { redirect } from "next/navigation";
import useFormState from "react-dom";
import { LoginForm } from "@/components/client/form";
const Login = async () => {
  const session = await auth();
  const user = session?.user;
  if (user) redirect("/");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* Login Form */}
        <LoginForm />
        {/* Register Link */}
        <p className="mt-4 text-center text-gray-600">
          Dont have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>

        {/* Social Login Buttons */}
        <div className="mt-8">
          <section className="flex items-center justify-between space-x-4">
            {/* GitHub Sign In */}
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
              >
                <IconBrandGithub className="mr-2" />
                <span>GitHub</span>
              </button>
            </form>

            {/* Google Sign In */}
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button
                type="submit"
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                <IconBrandGoogle className="mr-2" />
                <span>Google</span>
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
