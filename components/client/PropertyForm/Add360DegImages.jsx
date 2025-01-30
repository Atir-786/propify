import { Input } from "@/components/ui/input";
import React from "react";

const Add360DegImages = ({ register, errors }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Step 7: Upload 3D Images</h2>
      <p className="text-sm text-red-500">
        Note: Ensure images are high-quality but under 5 MB for faster loading.
        You can use recommended tools like Kuula, Metareal Stage, Google Street
        View, or Theta 360 to capture 360-degree images.
      </p>
      <div className="m-2">
        <Input
          type="file"
          id="virtualImages"
          multiple
          accept="image/*"
          {...register("virtualImages", {
            // required: "Please upload at least 3 pictures",
            validate: (files) => {
              //   if (!files || files.length === 0) {
              //     return "Please upload between 3 and 6 pictures";
              //   }
              //   if (files.length < 3) {
              //     return "You must upload at least 3 pictures";
              //   }
              if (files.length > 3) {
                return "You cannot upload more than 3 pictures";
              }
              return true;
            },
          })}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.virtualImages && (
          <p className="text-red-500 text-sm mt-2">
            {errors.virtualImages.message}
          </p>
        )}
      </div>
    </>
  );
};

export default Add360DegImages;
