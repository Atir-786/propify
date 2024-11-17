"use client";
import { login } from "@/action/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { register } from "@/action/user";
const LoginForm = () => {
  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if (!email || !password) return toast("enter all fields");
        const toastId = toast.loading("logging in");
        const error = await login(email, password);

        if (!error) {
          toast.success("success", { id: toastId });
          router.refresh();
        } else {
          toast.error(String(error), { id: toastId });
        }
      }}
      className="space-y-6"
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password" />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
      >
        Login
      </button>
    </form>
  );
};
const SignupForm = () => {
  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        const firstName = formData.get("firstname") as string;
        const lastName = formData.get("lastname") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if (!firstName || !lastName || !email || !password)
          return toast.error("plz fill all the fields");
        // console.log("before connection");
        const error = await register(firstName, lastName, email, password);
        if (!error) {
          toast.success("Registered Successfully");
          router.replace("/login");
        } else {
          console.log(error);
          toast.error(error);
        }
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="firstname">First Name</Label>
          <Input id="firstname" type="text" name="firstname" />
        </div>
        <div>
          <Label htmlFor="lastname">Last Name</Label>
          <Input id="lastname" type="text" name="lastname" />
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" name="email" />
      </div>

      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" name="password" />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-300"
      >
        Sign Up
      </button>
    </form>
  );
};
export { LoginForm, SignupForm };
