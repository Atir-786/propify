import React from "react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/models/Property";
import connectDB from "@/lib/db";
import Link from "next/link";

const PropertiesList = async () => {
  let query = "";
  await connectDB();

  let filter = { status: { $ne: "pending" } };
  let isNumberQuery = false;
  let parsedNumber = null;

  if (query) {
    const priceMatch = query.match(/\b(\d+)-(\d+)\b/);
    const belowMatch = query.match(/\bbelow (\d+)\b/i);
    const aboveMatch = query.match(/\babove (\d+)\b/i);
    const numberOnlyMatch = query.match(/^\d+$/); // Match only numbers

    if (priceMatch) {
      const minPrice = parseInt(priceMatch[1], 10);
      const maxPrice = parseInt(priceMatch[2], 10);
      filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (belowMatch) {
      const maxPrice = parseInt(belowMatch[1], 10);
      filter.price = { $lte: maxPrice };
    } else if (aboveMatch) {
      const minPrice = parseInt(aboveMatch[1], 10);
      filter.price = { $gte: minPrice };
    } else if (numberOnlyMatch) {
      // If user types just a number, show suggestions instead
      isNumberQuery = true;
      parsedNumber = parseInt(query, 10);
    } else {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { state: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
      ];
    }
  }

  const properties = isNumberQuery ? [] : await Property.find(filter);

  return (
    <>
      {isNumberQuery && (
        <div className="flex flex-wrap gap-3 p-4 bg-gray-100 rounded-md">
          <p className="text-gray-700">Did you mean?</p>
          <Link href={`?query=below ${parsedNumber}`} className="btn">
            Properties Below ${parsedNumber}
          </Link>
          <Link href={`?query=above ${parsedNumber}`} className="btn">
            Properties Above ${parsedNumber}
          </Link>
          <Link href={`?query=0-${parsedNumber}`} className="btn">
            Properties Between $0 - ${parsedNumber}
          </Link>
        </div>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : isNumberQuery ? null : (
          <p className="text-center text-gray-500 col-span-full">
            No properties found for {query}
          </p>
        )}
      </ul>
    </>
  );
};

export default PropertiesList;
