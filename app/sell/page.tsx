import React from "react";
import { Button } from "@/components/ui/button";
import { AddPropertyForm } from "@/components/client/form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
async function Sell() {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login");
  return (
    <div className="text-4xl">
      <AddPropertyForm />
    </div>
  );
}

export default Sell;
