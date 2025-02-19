import React from "react";
import { formatDate } from "@/lib/utils";
import { EyeIcon, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const PropertyCard = ({ property }) => {
  return (
    <li className="bg-white shadow-md rounded-xl overflow-hidden transition hover:shadow-lg">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden group">
        <Image
          src={property.images[0]}
          width={500}
          height={500}
          alt={property.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform"
        />
        <span
          className={`px-2 py-1 absolute top-2 left-2 text-sm font-medium rounded-md ${
            property.status === "active"
              ? "bg-green-500 text-white"
              : property.status === "sold"
              ? "bg-red-500 text-white"
              : property.status === "reserved"
              ? "bg-orange-500 text-white"
              : property.status === "pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          {property.status}
        </span>
        {/* Favorite (Wishlist) Icon */}
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
          ❤️
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {property.title}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-2">
          {property.description}
        </p>

        {/* Location Section */}
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin size={16} className="mr-1 text-red-500" />
          <span>
            {property.address} {property.city}
          </span>
        </div>

        {/* Property Status */}
        <div className="mt-2">
          <span
            className={` bg-green-500 text-white px-3 py-1 text-sm font-medium rounded-md`}
          >
            $ {property.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4 border-t flex justify-between items-center">
        <span className="text-gray-500 text-xs">
          {formatDate(property.createdAt)}
        </span>
        <Link
          href={`/property/${property._id}`}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </li>
  );
};

export default PropertyCard;
