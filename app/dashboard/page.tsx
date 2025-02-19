import { getPendingProperties } from "@/action/property";
import { auth } from "@/auth";
import PropertyCard from "@/components/PropertyCard";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth(); // Get logged-in user session

  if (!session?.user) {
    return redirect("/login"); // Redirect if not logged in
  }
  console.log(session.user.role);
  if (session.user.role !== "admin") {
    return redirect("/"); // Redirect if not an admin
  }

  const pendingProperties = await getPendingProperties();
  console.log(pendingProperties);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      <p className="text-lg mb-4">Manage properties pending for approval.</p>

      {pendingProperties.length === 0 ? (
        <p className="text-gray-500">No pending properties.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pendingProperties.map((property, index) => (
            <li key={index}>
              <PropertyCard property={property} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default page;
