import React from "react";
import connectDB from "@/lib/db";
import PropertyCard from "@/components/PropertyCard";
import { auth } from "@/auth";
import { User } from "@/models/User";
import { Property } from "@/models/Property";
import mongoose from "mongoose"; // Import mongoose for ObjectId validation

const WishlistPage = async () => {
  await connectDB();

  const session = await auth();
  const user = session?.user;
  if (!user) {
    return (
      <p className="text-center text-gray-500">
        You must be logged in to view your wishlist.
      </p>
    );
  }

  // Fetch user and populate wishlist
  const u = await User.findById(user.id);
  console.log(u);
  if (!u || !u.wishlist || u.wishlist.length === 0) {
    return <p className="text-center text-gray-500">Your wishlist is empty.</p>;
  }

  // ✅ Convert string IDs to ObjectId
  const validPropertyIds = u.wishlist
    .filter((id) => mongoose.Types.ObjectId.isValid(id)) // Check validity
    .map((id) => new mongoose.Types.ObjectId(id)); // Convert to ObjectId

  if (validPropertyIds.length === 0) {
    return <p className="text-center text-gray-500">Your wishlist is empty.</p>;
  }

  // ✅ Query properties using converted ObjectIds
  const wishlistedProperties = await Property.find({
    _id: { $in: validPropertyIds },
  });
  console.log(wishlistedProperties);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlistedProperties.map((property, index) => (
          <li key={property._id}>
            <PropertyCard property={property} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistPage;
