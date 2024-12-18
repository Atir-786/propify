import PropertyCard from "@/components/PropertyCard";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
const page = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/");
  }
  // console.log(user);
  // console.log("yekla");
  const { email } = user;
  await connectDB();
  const { properties } = await User.findOne({ email });
  // console.log(properties);
  // if (!properties) return;
  return (
    <section>
      <h1 className="text-center text-3xl">My Properties</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {properties.map((property) => (
          <PropertyCard key={property.location} property={property} />
        ))}
      </ul>
    </section>
  );
};

export default page;
