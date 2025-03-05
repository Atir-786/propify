"use client";
import React, { useEffect, useState } from "react";
import { handleWishlist } from "@/action/user";

const WishlistButton = ({ id }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check wishlist status when component mounts
  useEffect(() => {
    const checkWishlist = async () => {
      const res = await handleWishlist(""); // Empty ID to just get wishlist
      if (res?.wishlist?.includes(id)) {
        setIsWishlisted(true);
      }
    };

    checkWishlist();
  }, [id]);

  // Toggle wishlist
  const toggleWishlist = async () => {
    const res = await handleWishlist(id);
    if (res.success) {
      setIsWishlisted(res.wishlist.includes(id));
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-300 
    flex items-center justify-center w-10 h-10 text-xl 
    ${
      isWishlisted
        ? "bg-white text-white hover:bg-red-100 shadow-lg" // Saved (Red)
        : "bg-white text-gray-700 hover:bg-gray-200" // Not saved (White)
    }`}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isWishlisted ? "❤️" : "🤍"}
    </button>
  );
};

export default WishlistButton;
