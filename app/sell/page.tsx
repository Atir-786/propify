import React from "react";
import { Button } from "@/components/ui/button";
import { AddPropertyForm } from "@/components/client/form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import MultiStepForm from "@/components/client/PropertyForm/MultiStepForm";
async function Sell() {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login");
  // console.log(user);
  // await connectDB();

  return (
    <div className="text-4xl">
      {/* <AddPropertyForm ownerId={user.id} /> */}
      <MultiStepForm />
      {/* <ReactHookForm /> */}
    </div>
  );
}

export default Sell;
