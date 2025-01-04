import React from "react";

const ImageDetails = ({ register, errors }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Step 6: Upload Images</h2>
      <div className="mb-4">
        <label htmlFor="images" className="block font-medium text-gray-700">
          Upload Property Pictures (Min: 3)
        </label>
        <input
          type="file"
          id="images"
          multiple
          accept="image/*"
          {...register("images", {
            required: "Please upload at least 3 pictures",
            validate: (files) =>
              files?.length >= 3 || "You must upload at least 3 pictures",
          })}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.propertyImages && (
          <p className="text-red-500 text-sm mt-2">
            {String(errors.propertyImages.message)}
          </p>
        )}
      </div>
    </>
  );
};

export default ImageDetails;
