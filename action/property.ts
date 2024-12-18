"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { Property } from "@/models/Property";
import { User } from "@/models/User";
// const session = await auth();
// const user = session.user;
// console.log(user);
const addProperty = async (
  title: string,
  location: string,
  price: number,
  description: string,
  images: string[]
) => {
  try {
    const session = await auth();
    const { email } = session.user;
    // console.log(user);
    await connectDB();
    await Property.create({ title, location, price, description, images });
    await User.findOneAndUpdate(
      { email },
      {
        $push: { properties: { title, location, price, description, images } },
      }
    );
    console.log("property created successfully");
  } catch (error) {
    return "an error occured during property creation";
  }
};
export { addProperty };
