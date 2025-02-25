import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { register } from "@/action/user";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/client/form";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
const Register = async () => {
  const session = await auth();
  const user = session?.user;
  if (user) redirect("/");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome</h2>

        {/* Registration Form */}
        <SignupForm />
        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
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
export default Register;
