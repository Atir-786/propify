import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useState } from "react";
const AmenityDetails = ({ register, errors }) => {
  const [propertyType, setPropertyType] = useState("");
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Step 5: Amenities & Details
      </h2>
      {/* Property Type */}
      <div className="mb-4">
        <Label
          htmlFor="propertyType"
          className="block text-gray-700 font-medium"
        >
          Property Type
        </Label>
        <select
          {...register("propertyType", {
            required: "Property type is required",
          })}
          id="propertyType"
          className="text-sm mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="house">House</option>
          <option value="land">Land</option>
        </select>
        {errors.propertyType && (
          <p className="text-sm text-red-500 mt-1">
            {errors.propertyType.message}
          </p>
        )}
      </div>
      {/* Fields for Land */}

      <div className="mb-4">
        <Label htmlFor="landSize" className="block text-gray-700 font-medium">
          Total Land Size (in sq. ft.)
        </Label>
        <Input
          {...register("landSize", { required: "Land size is required" })}
          type="number"
          id="landSize"
          placeholder="Enter total land size"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
        {errors.landSize && (
          <p className="text-sm text-red-500 mt-1">{errors.landSize.message}</p>
        )}
      </div>

      {/* Fields for House */}
      {propertyType === "house" && (
        <>
          {/* House Size */}
          <div className="mb-4">
            <Label
              htmlFor="houseSize"
              className="block text-gray-700 font-medium"
            >
              House Size (in sq. ft.)
            </Label>
            <Input
              {...register("houseSize", { required: "House size is required" })}
              type="number"
              id="houseSize"
              placeholder="Enter house size"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
            />
            {errors.houseSize && (
              <p className="text-sm text-red-500 mt-1">
                {errors.houseSize.message}
              </p>
            )}
          </div>
          {/* Number of Bedrooms */}
          <div className="mb-4">
            <Label
              htmlFor="bedrooms"
              className="block text-gray-700 font-medium"
            >
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
              <p className="text-sm text-red-500 mt-1">
                {errors.bedrooms.message}
              </p>
            )}
          </div>
          {/* bathrooms */}
          <div className="mb-4">
            <Label
              htmlFor="bathrooms"
              className="block text-gray-700 font-medium"
            >
              Number of Bathrooms
            </Label>
            <Input
              {...register("bathrooms", {
                required: "Number of bathrooms is required",
              })}
              type="number"
              id="bathrooms"
              placeholder="Enter number of bathrooms"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
            />
            {errors.bathrooms && (
              <p className="text-sm text-red-500 mt-1">
                {errors.bathrooms.message}
              </p>
            )}
          </div>

          {/* furnishing */}
          <div className="mb-4">
            <Label
              htmlFor="furnishing"
              className="block text-gray-700 font-medium"
            >
              Furnishing Status
            </Label>
            <select
              {...register("furnishing", {
                required: "Furnishing status is required",
              })}
              id="furnishing"
              className="text-sm mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select</option>
              <option value="Fully Furnished">Fully Furnished</option>
              <option value="Semi Furnished">Semi Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
            {errors.furnishing && (
              <p className="text-sm text-red-500 mt-1">
                {errors.furnishing.message}
              </p>
            )}
          </div>
          {/* amenities */}
          <div className="mb-4">
            <Label className="block text-gray-700 font-medium mb-2">
              Available Amenities
            </Label>
            <div className="flex flex-wrap gap-4">
              {["Gym", "Swimming Pool", "Garden", "Play Area"].map(
                (amenity) => (
                  <Label key={amenity} className="flex items-center">
                    <input
                      {...register("amenities")}
                      type="checkbox"
                      value={amenity}
                      className="mr-2"
                    />
                    {amenity}
                  </Label>
                )
              )}
            </div>
          </div>

          {/* Built year */}
          <div className="mb-4">
            <Label
              htmlFor="builtYear"
              className="block text-gray-700 font-medium"
            >
              Built year
            </Label>
            <Input
              {...register("builtYear", { required: "Built year is required" })}
              type="number"
              id="builtYear"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
            />
            {errors.builtYear && (
              <p className="text-sm text-red-500 mt-1">
                {errors.builtYear.message}
              </p>
            )}
          </div>
        </>
      )}
      <div className="mb-4">
        <Label htmlFor="parking" className="block text-gray-700 font-medium">
          Parking Availability
        </Label>
        <select
          {...register("parking", {
            required: "Parking availability is required",
          })}
          id="parking"
          className="text-sm mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.parking && (
          <p className="text-red-500 mt-1">{errors.parking.message}</p>
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
          placeholder="E.g., garage..."
          className="text-sm mt-2 p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  );
};

export default AmenityDetails;
