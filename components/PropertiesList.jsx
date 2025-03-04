import React from "react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/models/Property";
import connectDB from "@/lib/db";
import Link from "next/link";

const PropertiesList = async () => {
  await connectDB();

  let filter = { status: { $ne: "pending" } };

  const properties = await Property.find(filter);

  return (
    <>
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
    </>
  );
};

export default PropertiesList;
