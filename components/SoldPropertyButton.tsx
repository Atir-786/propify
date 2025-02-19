"use client";
import React from "react";
import { Button } from "./ui/button";
import { Property } from "@/models/Property";
import connectDB from "@/lib/db";
// import { ObjectId } from "mongodb";
import { deleteProperty, markPropertyAsSold } from "@/action/property";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function SoldPropertyButton({ id, ownerId }) {
  const router = useRouter();

  async function handleMarkAsSOld() {
    const confirmSold = window.confirm(
      "Are you sure you want to mark this property sold ?"
    );

    if (!confirmSold) return;
    console.log("marking as sold");
    // console.log(id, ownerId);
    const error = await markPropertyAsSold(id);
    if (!error) {
      toast.success("Marked As Sold");
    } else {
      console.log(error);
      toast.error(error);
    }
  }
  return (
    <Button onClick={handleMarkAsSOld} className="w-full mt-2 bg-green-400">
      Mark As Sold (not working currenty)
    </Button>
  );
}
