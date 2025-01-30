import React from "react";
import VirtualTour from "@/components/VirtualTour";
import { Property } from "@/models/Property";
import { ObjectId } from "mongodb";

const page = async ({ params }) => {
  const { id } = await params;
  console.log(id);
  const property = await Property.findOne({ _id: new ObjectId(id) });
  const images = property.virtualImages;
  console.log(images);
  return (
    <>
      <VirtualTour images={images} />
    </>
  );
};

export default page;
