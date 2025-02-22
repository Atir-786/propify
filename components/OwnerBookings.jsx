"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { updateBookingStatus } from "@/action/booking";
import { useRouter } from "next/navigation";

export default function OwnerBookings({ bookings }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">Bookings for My Properties</h3>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings on your properties yet.</p>
      ) : (
        bookings.map((booking) => (
          <BookingItem key={String(booking._id)} booking={booking} />
        ))
      )}
    </div>
  );
}

function BookingItem({ booking }) {
  const router = useRouter();
  const [status, setStatus] = useState(booking.status);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus) => {
    startTransition(async () => {
      const res = await updateBookingStatus(String(booking._id), newStatus);
      if (res.success) {
        router.refresh();
        setStatus(newStatus);
      }
    });
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white mb-3">
      <p>Date: {new Date(booking.date).toDateString()}</p>
      <p>Time: {booking.time}</p>
      <p
        className={`font-semibold ${
          status === "pending"
            ? "text-yellow-500"
            : status === "approved"
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        Status: {status}
      </p>
      <Link
        href={`/property/${booking.propertyId}`}
        className="text-blue-500 underline"
      >
        View Property
      </Link>

      {status === "pending" && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => handleStatusChange("approved")}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:bg-gray-400"
            disabled={isPending}
          >
            {isPending ? "Approving..." : "Approve"}
          </button>
          <button
            onClick={() => handleStatusChange("rejected")}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-400"
            disabled={isPending}
          >
            {isPending ? "Rejecting..." : "Reject"}
          </button>
        </div>
      )}
    </div>
  );
}
