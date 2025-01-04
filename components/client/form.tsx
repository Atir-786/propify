"use client";
import { login } from "@/action/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { register } from "@/action/user";
import { addProperty } from "@/action/property";
import { supabase } from "@/lib/supabase";
import connectDB from "@/lib/db";
import { useEffect, useState } from "react";
const LoginForm = () => {
  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        if (!email || !password) {
          toast("enter all fields");
          return;
        }
        const toastId = toast.loading("logging in");
        const error = await login(email, password);

        if (!error) {
          toast.success("successss", { id: toastId });
          console.log("hello");
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
        if (!firstName || !lastName || !email || !password) {
          toast.error("plz fill all the fields");
          return;
        }
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
const AddPropertyForm = ({ ownerId }) => {
  const [step, setStep] = useState(1);
  const nextStep = () => {
    if (step < 4) setStep((prev) => prev + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  const router = useRouter();

  return (
    <>
      <form
        action={async (formData) => {
          const title = formData.get("title") as string;
          const address = formData.get("address") as string;
          const price = Number(formData.get("price") as string);
          const description = formData.get("description") as string;
          const propertyType = formData.get("propertyType") as string;
          const city = formData.get("city") as string;
          const state = formData.get("state") as string;
          const zip = Number(formData.get("zip") as string);
          const country = formData.get("country") as string;
          const name = formData.get("name") as string;
          const email = formData.get("description") as string;
          const phone = Number(formData.get("description") as string);
          const images = formData.getAll("images") as File[];
          if (
            !title ||
            !price ||
            !description ||
            !propertyType ||
            !address ||
            !city ||
            !state ||
            !zip ||
            !country ||
            !name ||
            !email ||
            !phone ||
            !images
          ) {
            toast.error("Please fill all the fields");
            return;
          }

          // Upload images to Supabase
          const uploadedImages: string[] = [];
          for (const image of images) {
            const { data, error } = await supabase.storage
              .from("propertyImages")
              .upload(`${Date.now()}_${image.name}`, image);
            if (error) {
              console.log(error.message);
              throw new Error("Image upload failed");
            }
            const publicUrl = supabase.storage
              .from("propertyImages")
              .getPublicUrl(data.path).data.publicUrl;
            uploadedImages.push(publicUrl);
          }

          // const error = await addProperty(
          //   title,
          //   price,
          //   description,
          //   propertyType,
          //   address,
          //   state
          //   city,
          //   zip,
          //   country,
          //   name,
          //   email,
          //   phone,
          //   uploadedImages,
          //   ownerId
          // );
          // if (!error) {
          //   toast.success("Registered Successfully");

          //   router.replace("/");
          // } else {
          //   console.log(error);
          //   toast.error(error);
          // }
        }}
        className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Add Property
        </h2>

        {/* <div className="grid grid-cols-1 gap-4"> */}
        {step === 1 && (
          <>
            {/* title */}
            <div>
              <Label
                htmlFor="title"
                className="block text-gray-700 font-medium"
              >
                Title
              </Label>
              <Input
                id="title"
                type="text"
                name="title"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/*  Description */}
            <div className="mt-4">
              <Label
                htmlFor="description"
                className="block text-gray-700 font-medium"
              >
                Description
              </Label>
              <Input
                id="description"
                type="text"
                name="description"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Price */}
            <div className="mt-4">
              <Label
                htmlFor="price"
                className="block text-gray-700 font-medium"
              >
                Price
              </Label>
              <Input
                id="price"
                type="number"
                name="price"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* propertyType */}
            <div className="mt-4">
              <Label
                htmlFor="propertyType"
                className="block text-gray-700 font-medium"
              >
                propertyType
              </Label>
              <select
                id="propertyType"
                name="propertyType"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            {/* address */}
            <div className="mt-4">
              <Label
                htmlFor="address"
                className="block text-gray-700 font-medium"
              >
                address
              </Label>
              <Input
                id="address"
                type="text"
                name="address"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* city */}
            <div className="mt-4">
              <Label htmlFor="city" className="block text-gray-700 font-medium">
                city
              </Label>
              <Input
                id="city"
                type="text"
                name="city"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* state */}
            <div className="mt-4">
              <Label
                htmlFor="state"
                className="block text-gray-700 font-medium"
              >
                state
              </Label>
              <Input
                id="state"
                type="text"
                name="state"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* zip */}
            <div className="mt-4">
              <Label htmlFor="zip" className="block text-gray-700 font-medium">
                zip
              </Label>
              <Input
                id="zip"
                type="number"
                name="zip"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* country */}
            <div className="mt-4">
              <Label
                htmlFor="country"
                className="block text-gray-700 font-medium"
              >
                country
              </Label>
              <Input
                id="country"
                type="text"
                name="country"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
              />
            </div>
          </>
        )}
        {step === 3 && (
          <>
            {/* name */}
            <div className="mt-4">
              <Label htmlFor="name" className="block text-gray-700 font-medium">
                name
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* email */}
            <div className="mt-4">
              <Label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                email
              </Label>
              <Input
                id="email"
                type="text"
                name="email"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* phone */}
            <div className="mt-4">
              <Label
                htmlFor="phone"
                className="block text-gray-700 font-medium"
              >
                phone
              </Label>
              <Input
                id="phone"
                type="number"
                name="phone"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
              />
            </div>
          </>
        )}
        {step === 4 && (
          <>
            {/* Image Upload */}
            <div className="mt-4">
              <Label
                htmlFor="images"
                className="block text-gray-700 font-medium"
              >
                Upload Images
              </Label>
              <Input
                id="images"
                type="file"
                name="images"
                multiple
                accept="image/*"
                className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
              />
            </div>
          </>
        )}
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Back
            </button>
          )}
          {step < 4 && (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          )}
          {step === 4 && (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export { LoginForm, SignupForm, AddPropertyForm };
