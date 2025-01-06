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
          {...register("title", {
            required: "title is required",
            minLength: {
              value: 3,
              message: "title must be at least 3 characters long",
            },
            maxLength: {
              value: 15,
              message: "title cannot exceed 15 characters",
            },
          })}
          type="text"
          id="title"
          placeholder="Enter a catchy title"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      <div className="mb-4">
        <Label
          htmlFor="description"
          className="block font-medium text-gray-700"
        >
          Description
        </Label>
        <Input
          {...register("description", {
            required: true,
            minLength: {
              value: 10,
              message: "description must be at least 10 characters long",
            },
            maxLength: {
              value: 50,
              message: "description cannot exceed 50 characters",
            },
          })}
          id="description"
          type="text"
          placeholder="Describe the property"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <Label htmlFor="price" className="block font-medium text-gray-700">
          Price
        </Label>
        <Input
          {...register("price", {
            required: true,
            minLength: {
              value: 3,
              message: "price must be at least 3 characters long",
            },
            maxLength: {
              value: 20,
              message: "price cannot exceed 20 characters",
            },
          })}
          type="number"
          id="price"
          placeholder="Enter price in USD"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>
      {/* <div className="mb-4">
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
        {errors.propertyType && (
          <p className="text-red-500 text-sm mt-1">PropetyType is required</p>
        )}
      </div> */}
    </>
  );
};

export default PropertyDetails;
