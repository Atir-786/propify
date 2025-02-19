"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  deleteProperty,
  markPropertyAsSold,
  markPropertyAsActive,
  markPropertyAsReserved,
} from "@/action/property";

export default function PropertyActionButton({
  id,
  ownerId,
  action,
  label,
  className,
}) {
  const router = useRouter();

  async function handleClick() {
    const confirmAction = window.confirm(
      `Are you sure you want to ${label.toLowerCase()} this property?`
    );

    if (!confirmAction) return;

    let error = null;
    switch (action) {
      case "markAsSold":
        error = await markPropertyAsSold(id);
        break;
      case "markAsActive":
        error = await markPropertyAsActive(id);
        break;
      case "markAsReserved":
        error = await markPropertyAsReserved(id);
        break;
      case "delete":
        error = await deleteProperty(id);
        break;
      default:
        console.error("Invalid action type");
        return;
    }

    if (!error) {
      toast.success(`${label} successful`);
      router.refresh();
    } else {
      console.error(error);
      toast.error(error);
    }
  }

  return (
    <Button onClick={handleClick} className={`w-full mt-2 ${className}`}>
      {label}
    </Button>
  );
}
