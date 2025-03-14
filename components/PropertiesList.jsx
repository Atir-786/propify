import React from "react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/models/Property";
import connectDB from "@/lib/db";

const PropertiesList = async ({ location, minPrice, maxPrice, status }) => {
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

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {properties.length > 0 ? (
        properties.map((property, index) => (
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
