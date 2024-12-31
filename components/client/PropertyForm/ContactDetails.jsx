import React from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

const ContactDetails = ({ register }) => {
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
          {...register("name", { required: true })}
          id="name"
          type="text"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* email */}
      <div className="mt-4">
        <Label htmlFor="email" className="block text-gray-700 font-medium">
          email
        </Label>
        <Input
          {...register("email", { required: true })}
          id="email"
          type="email"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
      </div>
      {/* phone */}
      <div className="mt-4">
        <Label htmlFor="phone" className="block text-gray-700 font-medium">
          phone
        </Label>
        <Input
          {...register("phone", { required: true })}
          id="phone"
          type="number"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500"
        />
      </div>
    </>
  );
};

export default ContactDetails;
