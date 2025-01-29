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

      {propertyType === "land" && (
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
            <p className="text-sm text-red-500 mt-1">
              {errors.landSize.message}
            </p>
          )}
        </div>
      )}

      {/* Fields for House */}
      {propertyType === "house" && (
        <>
          <div className="mb-4">
            <Label
              htmlFor="totalHouseArea"
              className="block text-gray-700 font-medium"
            >
              Total House Area (in sq. ft.)
            </Label>
            <Input
              {...register("totalHouseArea", {
                required: "total house area is required",
              })}
              type="number"
              id="totalHouseArea"
              placeholder="Enter total house area"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
            />
            {errors.totalHouseArea && (
              <p className="text-sm text-red-500 mt-1">
                {errors.totalHouseArea.message}
              </p>
            )}
          </div>
          {/* Lot area */}
          <div className="mb-4">
            <Label
              htmlFor="lotArea"
              className="block text-gray-700 font-medium"
            >
              Lot Area (in sq. ft.)
            </Label>
            <Input
              {...register("lotArea", { required: "lot area is required" })}
              type="number"
              id="lotArea"
              placeholder="Enter lot area"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
            />
            {errors.lotArea && (
              <p className="text-sm text-red-500 mt-1">
                {errors.lotArea.message}
              </p>
            )}
          </div>
          {/* living area */}
          <div className="mb-4">
            <Label
              htmlFor="livingArea"
              className="block text-gray-700 font-medium"
            >
              Living Area (in sq. ft.)
            </Label>
            <Input
              {...register("livingArea", {
                required: "living area is required",
              })}
              type="number"
              id="livingArea"
              placeholder="Enter living area"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
            />
            {errors.livingArea && (
              <p className="text-sm text-red-500 mt-1">
                {errors.livingArea.message}
              </p>
            )}
          </div>{" "}
          {/* living area renovated */}
          <div className="mb-4">
            <Label
              htmlFor="livingAreaRenovated"
              className="block text-gray-700 font-medium"
            >
              Living Area Renovated (in sq. ft.)
            </Label>
            <Input
              {...register("livingAreaRenovated", {
                required: "Living Area Renovated is required",
              })}
              type="number"
              id="livingAreaRenovated"
              placeholder="Enter living Area Renovated"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
            />
            {errors.livingAreaRenovated && (
              <p className="text-sm text-red-500 mt-1">
                {errors.livingAreaRenovated.message}
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
          {/* Floors */}
          <div className="mb-4">
            <Label htmlFor="floors" className="block text-gray-700 font-medium">
              Number of floors
            </Label>
            <Input
              {...register("floors", {
                required: "Number of floors is required",
                min: { value: 1, message: "There must be at least 1 floor" },
                max: {
                  value: 100,
                  message: "Number of floors cannot exceed 100",
                },
              })}
              type="number"
              id="floors"
              placeholder="Enter number of floors"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
            />
            {errors.floors && (
              <p className="text-sm text-red-500 mt-1">
                {errors.floors.message}
              </p>
            )}
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
              {...register("builtYear", {
                required: "Built year is required",
                min: {
                  value: 1800,
                  message: "Built year must be at least 1800",
                },
                max: { value: 2025, message: "Built year cannot exceed 2025" },
              })}
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
          {/* Grade of the House */}
          <div className="mb-4">
            <Label
              htmlFor="houseGrade"
              className="block text-gray-700 font-medium"
            >
              Grade of the House (1 to 10)
            </Label>
            <select
              {...register("houseGrade", {
                required: "Grade of the house is required",
                validate: (value) =>
                  (value >= 1 && value <= 10) ||
                  "Grade must be between 1 and 10",
              })}
              id="houseGrade"
              className="text-sm mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Grade</option>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
            {errors.houseGrade && (
              <p className="text-sm text-red-500 mt-1">
                {errors.houseGrade.message}
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
