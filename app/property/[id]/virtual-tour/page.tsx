import React from "react";
import VirtualTour from "@/components/VirtualTour";
import { getPropertyDetails } from "@/action/property";
const page = async ({ params }) => {
  const { id } = await params;
  const images = await getPropertyDetails(id);
  console.log(images);
  return (
    <>
      <VirtualTour images={images} />
    </>
  );
};

export default page;
