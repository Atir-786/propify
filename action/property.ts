"use server";

import connectDB from "@/lib/db";
import { Property } from "@/models/Property";

const addProperty = async (
  title: string,
  location: string,
  price: number,
  description: string,
  images: string[]
) => {
  try {
    await connectDB();
    await Property.create({ title, location, price, description, images });
    console.log("property created successfully");
  } catch (error) {
    return "an error occured during property creation";
  }
};
export { addProperty };
