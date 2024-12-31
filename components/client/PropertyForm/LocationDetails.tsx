import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const LocationDetails = ({ register }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Step 2: Location Details</h2>
      <div className="mt-4">
        <Label htmlFor="address" className="block text-gray-700 font-medium">
          address
        </Label>
        <Input
          {...register("address", { required: true })}
          id="address"
          type="text"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* city */}
      <div className="mt-4">
        <Label htmlFor="city" className="block text-gray-700 font-medium">
          city
        </Label>
        <Input
          {...register("city", { required: true })}
          id="city"
          type="text"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* state */}
      <div className="mt-4">
        <Label htmlFor="state" className="block text-gray-700 font-medium">
          state
        </Label>
        <Input
          {...register("state", { required: true })}
          id="state"
          type="text"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* zip */}
      <div className="mt-4">
        <Label htmlFor="zip" className="block text-gray-700 font-medium">
          zip
        </Label>
        <Input
          {...register("zip", { required: true })}
          id="zip"
          type="number"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* country */}
      <div className="mt-4">
        <Label htmlFor="country" className="block text-gray-700 font-medium">
          country
        </Label>
        <Input
          {...register("country", { required: true })}
          id="country"
          type="text"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
      </div>
    </>
  );
};

export default LocationDetails;
