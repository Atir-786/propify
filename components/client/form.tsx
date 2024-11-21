"use client";
import { login } from "@/action/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { register } from "@/action/user";
import { addProperty } from "@/action/property";
import { supabase } from "@/lib/supabase";
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
const AddPropertyForm = () => {
  const router = useRouter();
  return (
    <form
      action={async (formData) => {
        const title = formData.get("title") as string;
        const location = formData.get("location") as string;
        const price = Number(formData.get("price") as string);
        const description = formData.get("description") as string;
        const images = formData.getAll("images") as File[];
        if (!title || !location || !price || !description || !images) {
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

        const error = await addProperty(
          title,
          location,
          price,
          description,
          uploadedImages
        );
        if (!error) {
          toast.success("Registered Successfully");
          router.replace("/");
        } else {
          console.log(error);
          toast.error(error);
        }
      }}
      className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Add Property
      </h2>

      {/* Title and Location */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="title" className="block text-gray-700 font-medium">
            Title
          </Label>
          <Input
            id="title"
            type="text"
            name="title"
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <Label htmlFor="location" className="block text-gray-700 font-medium">
            Location
          </Label>
          <Input
            id="location"
            type="text"
            name="location"
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Price */}
      <div className="mt-4">
        <Label htmlFor="price" className="block text-gray-700 font-medium">
          Price
        </Label>
        <Input
          id="price"
          type="number"
          name="price"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Description */}
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

      {/* Image Upload */}
      <div className="mt-4">
        <Label htmlFor="images" className="block text-gray-700 font-medium">
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

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-300"
        >
          Create Property
        </button>
      </div>
    </form>

    // <form
    //   action={async (formData) => {
    //     const title = formData.get("title") as string;
    //     const location = formData.get("location") as string;
    //     const price = Number(formData.get("price") as string);
    //     const description = formData.get("description") as string;
    //     const images = formData.getAll("images") as File[];
    //     if (!title || !location || !price || !description || !images) {
    //       toast.error("plzz fill all the fields");
    //       return;
    //     }
    //     // Uplad images to Supabase
    //     const uploadedImages: string[] = [];
    //     for (const image of images) {
    //       const { data, error } = await supabase.storage
    //         .from("propertyImages")
    //         .upload(`${Date.now()}_${image.name}`, image);
    //       if (error) {
    //         console.log(error.message);
    //         throw new Error("image upload failed");
    //       }
    //       const publicUrl = supabase.storage
    //         .from("propertyImages")
    //         .getPublicUrl(data.path).data.publicUrl;
    //       uploadedImages.push(publicUrl);
    //     }
    //     const error = await addProperty(
    //       title,
    //       location,
    //       price,
    //       description,
    //       uploadedImages
    //     );
    //     if (!error) {
    //       toast.success("Registered Successfully");
    //       router.replace("/");
    //     } else {
    //       console.log(error);
    //       toast.error(error);
    //     }
    //   }}
    //   className="space-y-6"
    // >
    //   <div className="grid grid-cols-1 gap-4">
    //     <div>
    //       <Label htmlFor="title">title</Label>
    //       <Input id="title" type="text" name="title" />
    //     </div>
    //     <div>
    //       <Label htmlFor="location">location</Label>
    //       <Input id="location" type="text" name="location" />
    //     </div>
    //   </div>

    //   <div className="mt-4">
    //     <Label htmlFor="price">price</Label>
    //     <Input id="price" type="number" name="price" />
    //   </div>

    //   <div className="mt-4">
    //     <Label htmlFor="description">description</Label>
    //     <Input id="description" type="text" name="description" />
    //   </div>
    //   <div className="mt-4">
    //     <Label htmlFor="images">Upload Images</Label>
    //     <Input
    //       id="images"
    //       type="file"
    //       name="images"
    //       multiple
    //       accept="image/*"
    //     />
    //   </div>
    //   {/* Submit Button */}
    //   <button
    //     type="submit"
    //     className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-300"
    //   >
    //     Create
    //   </button>
    // </form>
  );
};

export { LoginForm, SignupForm, AddPropertyForm };
