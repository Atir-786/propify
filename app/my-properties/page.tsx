import PropertyCard from "@/components/PropertyCard";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { Property } from "@/models/Property";
import mongoose from "mongoose";
const page = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/");
  }

  const { email } = user;
  await connectDB();
  const owner = await User.findOne({ email });
  console.log(owner);

  try {
    // Fetch properties using the converted ObjectIds
    console.log("fetching");
    const properties = await Property.find({ _id: { $in: owner.properties } });
    console.log(properties);
    if (!properties) throw new Error("No Properties");
    return (
      <section>
        <h1 className="text-center text-3xl">My Properties</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property}></PropertyCard>
          ))}
        </ul>
      </section>
    );
  } catch (error) {
    console.log("err", error);
    return <h1>No properties</h1>;
  }
};

export default page;
