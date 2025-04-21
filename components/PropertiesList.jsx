import React from "react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/models/Property";
import connectDB from "@/lib/db";
import { auth } from "@/auth";

const PropertiesList = async ({ location, minPrice, maxPrice, status }) => {
  const session = await auth();
  const user = session?.user;
  await connectDB();

  let filter = { status: { $ne: "pending" } };
  if (location) {
    filter.$or = [
      { address: { $regex: location, $options: "i" } },
      { city: { $regex: location, $options: "i" } },
      { state: { $regex: location, $options: "i" } },
      { country: { $regex: location, $options: "i" } },
    ];
  }
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (status) filter.status = status;
  const properties = await Property.find(filter);
  let recommendedIds = [];
  if (user) {
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }), // or user.id if that's your format
        cache: "no-store",
      });
      const recommended = await res.json();
      console.log("recommendations", recommended);
      recommendedIds = Array.isArray(recommended)
        ? recommended.map((p) => String(p._id))
        : [];
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
    }
  }

  // STEP 3: Add recommended flag to matching properties
  const enrichedProperties = properties.map((property) => ({
    ...property.toObject(), // if it's a Mongoose doc
    recommended: recommendedIds.includes(String(property._id)),
  }));
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {enrichedProperties.length > 0 ? (
        enrichedProperties.map((property, index) => (
          <li key={index}>
            <PropertyCard property={property} />
          </li>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No properties found
        </p>
      )}
    </ul>
  );
};

export default PropertiesList;
