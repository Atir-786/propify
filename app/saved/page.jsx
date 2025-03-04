import React from "react";
import connectDB from "@/lib/db";
import PropertyCard from "@/components/PropertyCard";
import { auth } from "@/auth";
import { User } from "@/models/User";
import { Property } from "@/models/Property";

const WishlistPage = async () => {
  await connectDB();

  const session = await auth();
  if (!session) {
    return (
      <p className="text-center text-gray-500">
        You must be logged in to view your wishlist.
      </p>
    );
  }

  const user = await User.findOne({ _id: session.user.id }).populate(
    "wishlist"
  );
  console.log(user);
  if (!user || !user.wishlist || user.wishlist.length === 0) {
    return <p className="text-center text-gray-500">Your wishlist is empty.</p>;
  }
  // Find properties using the wishlist array (contains property IDs)
  const wishlistedProperties = await Property.find({
    _id: { $in: user.wishlist },
  });
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlistedProperties.map((property, index) => (
          <li key={index}>
            <PropertyCard property={property} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistPage;
