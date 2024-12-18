import connectDB from "@/lib/db";
import { Property } from "@/models/Property";
import React from "react";
import { ObjectId } from "mongodb";
const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  await connectDB();
  try {
    const property = await Property.findOne({ _id: new ObjectId(id) });
    return (
      <div className="container mx-auto px-6 py-4">
        <h1 className="text-2xl font-bold">{property.title}</h1>
        <p>{property.description}</p>
        <p>Price: ${property.price}</p>
        {/* Add other property details as needed */}
      </div>
    );
  } catch (error) {
    console.error("error fetching Property ", error);
    return (
      <div>
        <h1>Error loading property</h1>
        <p>{error.message}</p>
      </div>
    );
  }
};

export default page;
