import React from "react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/models/Property";
import connectDB from "@/lib/db";
const PropertiesList = async () => {
  await connectDB();
  const properties = await Property.find({});
  console.log(properties);
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property}></PropertyCard>
      ))}
    </ul>
  );
};

export default PropertiesList;
