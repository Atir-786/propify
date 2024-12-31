import React from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
const PropertyDetails = ({ register, errors, control }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Step 1: Property Details</h2>
      <div className="mb-4">
        <Label htmlFor="title" className="block font-sm text-gray-700">
          Title
        </Label>
        <Input
          {...register("title", { required: "title is req" })}
          type="text"
          id="title"
          placeholder="Enter a catchy title"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
        {errors.title && <p>title is required</p>}
      </div>
      <div className="mb-4">
        <Label
          htmlFor="description"
          className="block font-medium text-gray-700"
        >
          Description
        </Label>
        <Input
          {...register("description", { required: true })}
          id="description"
          type="text"
          placeholder="Describe the property"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="price" className="block font-medium text-gray-700">
          Price
        </Label>
        <Input
          {...register("price", { required: true })}
          type="number"
          id="price"
          placeholder="Enter price in USD"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="mb-4">
        <Label
          htmlFor="propertyType"
          className="block font-medium text-gray-700"
        >
          Property Type
        </Label>
        <Controller
          name="propertyType"
          control={control}
          rules={{ required: "it is required" }}
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(value)} // Connect to React Hook Form
              value={field.value}
            >
              <SelectTrigger className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500">
                <SelectValue placeholder="Select Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.propertyType && <p>PropetyType is required</p>}
      </div>
    </>
  );
};

export default PropertyDetails;
