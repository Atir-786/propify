import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const AmenityDetails = ({ register, errors }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Step 5: Amenities & Details
      </h2>

      {/* Total Size */}
      <div className="mb-4">
        <Label htmlFor="size" className="block text-gray-700 font-medium">
          Total Size (in sq. ft.)
        </Label>
        <Input
          {...register("size", { required: "Total size is required" })}
          type="number"
          id="size"
          placeholder="Enter total size"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
        {errors.size && (
          <p className="text-red-500 mt-1">{errors.size.message}</p>
        )}
      </div>

      {/* Number of Bedrooms */}
      <div className="mb-4">
        <Label htmlFor="bedrooms" className="block text-gray-700 font-medium">
          Number of Bedrooms
        </Label>
        <Input
          {...register("bedrooms", {
            required: "Number of bedrooms is required",
          })}
          type="number"
          id="bedrooms"
          placeholder="Enter number of bedrooms"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
        {errors.bedrooms && (
          <p className="text-red-500 mt-1">{errors.bedrooms.message}</p>
        )}
      </div>

      {/* Age of Property */}
      <div className="mb-4">
        <Label htmlFor="builtYear" className="block text-gray-700 font-medium">
          Built year
        </Label>
        <Input
          {...register("builtYear")}
          type="number"
          id="builtYear"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
        {errors.builtYear && (
          <p className="text-red-500 mt-1">{errors.builtYear.message}</p>
        )}
      </div>

      {/* Additional Features */}
      <div className="mb-4">
        <Label htmlFor="features" className="block text-gray-700 font-medium">
          Additional Features
        </Label>
        <textarea
          {...register("features")}
          id="features"
          placeholder="E.g., Swimming pool, garage, etc."
          className="text-sm mt-2 p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
};

export default AmenityDetails;
