import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { register } from "@/action/user";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/client/form";
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
      </div>
    </div>
  );
};
export default Register;
