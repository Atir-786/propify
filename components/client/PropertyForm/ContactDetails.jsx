import React from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

const ContactDetails = ({ register, errors }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Step 4: Contact Details</h2>
      {/* Add contact details fields similar to above */}
      {/* name */}
      <div className="mt-4">
        <Label htmlFor="name" className="block text-gray-700 font-medium">
          name
        </Label>
        <Input
          {...register("name", {
            required: true,
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters long",
            },
            maxLength: {
              value: 30,
              message: "Name cannot exceed 20 characters",
            },
          })}
          id="name"
          type="text"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      {/* email */}
      <div className="mt-4">
        <Label htmlFor="email" className="block text-gray-700 font-medium">
          email
        </Label>
        <Input
          {...register("email", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
          id="email"
          type="email"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      {/* phone */}
      <div className="mt-4">
        <Label htmlFor="phone" className="block text-gray-700 font-medium">
          phone
        </Label>
        <Input
          {...register("phone", {
            required: true,
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Invalid phone number",
            },
          })}
          id="phone"
          type="number"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>
    </>
  );
};

export default ContactDetails;
