"use client";
import { Input } from "@/components/ui/input";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageDetails = ({ register, errors, setValue, watch }) => {
  const images = watch("images") || [];

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Combine existing files with new ones, but limit to 6
      const currentFiles = images || [];
      const newFiles = [...currentFiles, ...acceptedFiles].slice(0, 6);
      setValue("images", newFiles, { shouldValidate: true });
    },
    [images, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: true,
    maxFiles: 6,
  });

  const removeImage = (index) => {
    const newFiles = images.filter((_, i) => i !== index);
    setValue("images", newFiles, { shouldValidate: true });
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Step 6: Upload Images</h2>
      <div className="mb-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <input {...getInputProps()} />
          <input
            type="hidden"
            {...register("images", {
              required: "Please upload at least 3 pictures",
              validate: (files) => {
                if (!files || files.length === 0) {
                  return "Please upload between 3 and 6 pictures";
                }
                if (files.length < 3) {
                  return "You must upload at least 3 pictures";
                }
                if (files.length > 6) {
                  return "You cannot upload more than 6 pictures";
                }
                return true;
              },
            })}
          />
          {isDragActive ? (
            <p className="text-blue-500">Drop the images here...</p>
          ) : (
            <p className="text-gray-700">
              Drag & drop images here, or click to select (3-6 images)
            </p>
          )}
        </div>
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {images.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {errors.images && (
          <p className="text-red-500 text-sm mt-2">{errors.images.message}</p>
        )}
      </div>
    </>
  );
};

export default ImageDetails;
