import React from "react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/models/Property";
import connectDB from "@/lib/db";
import Link from "next/link";

const PropertiesList = async () => {
  await connectDB();

  // const searchParams = new URL(req.url).searchParams;
  // const location = searchParams.get("location") || "";
  // const price = searchParams.get("price") || "";

  let filter = { status: { $ne: "pending" } };

  // // 🔍 Location filter (matches city, state, or country)
  // if (location) {
  //   filter.$or = [
  //     { city: { $regex: location, $options: "i" } },
  //     { state: { $regex: location, $options: "i" } },
  //     { country: { $regex: location, $options: "i" } },
  //   ];
  // }

  // // 💲 Price filter
  // if (price) {
  //   const priceMatch = price.match(/\b(\d+)-(\d+)\b/); // Example: "100000-200000"
  //   if (priceMatch) {
  //     const minPrice = parseInt(priceMatch[1], 10);
  //     const maxPrice = parseInt(priceMatch[2], 10);
  //     filter.price = { $gte: minPrice, $lte: maxPrice };
  //   }
  // }

  const properties = await Property.find(filter);

  return (
    <>
      {/* {isNumberQuery && (
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
      )} */}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {properties.length > 0 ? (
          properties.map((property, index) => (
            <li key={index}>
              <PropertyCard property={property} />
            </li>
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
