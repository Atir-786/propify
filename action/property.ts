"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { Property } from "@/models/Property";
import { User } from "@/models/User";
// import { ObjectId } from "mongoose";
import { ObjectId } from "mongodb";

const addProperty = async (formDetails) => {
  try {
    const session = await auth();
    const { email } = session.user;
    const { id } = session.user;
    // console.log(user);
    await connectDB();
    const property = await Property.create({ ...formDetails, ownerId: id });
    const propertyId = property._id;
    console.log("yetem");
    await User.findOneAndUpdate(
      { email },
      {
        // $push: { properties: { title, location, price, description, images } },
        $push: {
          properties: propertyId,
        },
      }
    );
    console.log("property created successfully");
  } catch (error) {
    return "an error occured during property creation";
  }
};
const deleteProperty = async (propId) => {
  try {
    const session = await auth();
    const { id } = session.user;
    await connectDB();
    const property = await Property.findOneAndDelete({
      _id: new ObjectId(propId),
    });
    await User.updateOne(
      { _id: new ObjectId(id) },
      { $pull: { properties: new ObjectId(propId) } }
    );
    // console.log("deleting your property");

    console.log("property deleted successfully");
  } catch (error) {
    return "an error occured during property deletion";
  }
};
export { addProperty, deleteProperty };
