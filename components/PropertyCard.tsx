import React from "react";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
const PropertyCard = ({ property }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = property;

  return (
    <li className="property-card group">
      {/* Image Section */}
      <div className="relative h-48">
        <Image
          src={property.images[0]}
          width={500}
          height={500}
          alt={property.title}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {property.title}
        </h2>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {property.description}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-green-600 font-semibold">
            ${property.price.toLocaleString()}
          </span>
          <span className="text-gray-500 text-sm">{property.location}</span>
        </div>
      </div>

      <div className="p-4 border-t">
        <Link
          href={`/property/${property._id}`}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </li>
  );
};

export default PropertyCard;
