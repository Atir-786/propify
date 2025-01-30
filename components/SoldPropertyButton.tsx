"use client";
import React from "react";
import { Button } from "./ui/button";
import { Property } from "@/models/Property";
import connectDB from "@/lib/db";
// import { ObjectId } from "mongodb";
import { deleteProperty } from "@/action/property";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function SoldPropertyButton({ id, ownerId }) {
  const router = useRouter();

  async function handleDeleteProperty() {
    const confirmSold = window.confirm(
      "Are you sure you want to mark this property sold ?"
    );

    if (!confirmSold) return;
    // console.log("deleting");
    // console.log(id, ownerId);
    // const error = await deleteProperty(id);
    // if (!error) {
    //   toast.success("Deleted Successfully");
    //   router.replace("/");
    // } else {
    //   console.log(error);
    //   toast.error(error);
    // }
  }
  return (
    <Button className="w-full mt-2 bg-green-400">
      Mark As Sold (not working currenty)
    </Button>
  );
}
