"use server";

import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { Property } from "@/models/Property";
import { User } from "@/models/User";
// import { ObjectId } from "mongoose";
// import { ObjectId } from "mongodb";

const addProperty = async (formDetails) => {
  try {
    const session = await auth();
    const { email } = session.user;
    const { id } = session.user;
    // console.log(user);
    await connectDB();
    const property = await Property.create({
      ...formDetails,
      status: "pending",
      ownerId: id,
    });
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
async function markPropertyAsSold(id: string) {
  try {
    await connectDB();

    const property = await Property.findById(id);
    if (!property) return "Property not found";

    property.status = "sold"; // Update the status
    await property.save();

    return null; // No error, means success
  } catch (error) {
    return "Failed to mark as sold";
  }
}
async function markPropertyAsReserved(id: string) {
  try {
    await connectDB();

    const property = await Property.findById(id);
    if (!property) return "Property not found";

    property.status = "reserved"; // Update the status
    await property.save();

    return null; // No error, means success
  } catch (error) {
    return "Failed to mark as sold";
  }
}
async function markPropertyAsActive(id: string) {
  try {
    await connectDB();

    const property = await Property.findById(id);
    if (!property) return "Property not found";

    property.status = "active"; // Update the status
    await property.save();

    return null; // No error, means success
  } catch (error) {
    return "Failed to mark as sold";
  }
}

const deleteProperty = async (propId) => {
  try {
    const session = await auth();
    const { id } = session.user;
    await connectDB();
    const property = await Property.findOneAndDelete({
      propId,
    });
    await User.updateOne({ id }, { $pull: { properties: propId } });
    // console.log("deleting your property");

    console.log("property deleted successfully");
  } catch (error) {
    return "an error occured during property deletion";
  }
};
const getPropertyDetails = async (id: string) => {
  try {
    await connectDB(); // Ensure MongoDB connection
    const property = await Property.findById(id); // Use findById
    return property ? property.virtualImages : [];
  } catch (error) {
    console.error("Error fetching property:", error);
    return [];
  }
};
async function getPendingProperties() {
  await connectDB();
  return await Property.find({ status: "pending" }).lean();
}
export {
  addProperty,
  deleteProperty,
  getPropertyDetails,
  getPendingProperties,
  markPropertyAsSold,
  markPropertyAsReserved,
  markPropertyAsActive,
};
