"use client";
import { createBooking } from "@/action/booking";
import { auth } from "@/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TourBooking({ user, propId }) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    const userId = user.id;
    if (!date || !time) return alert("Please select date and time.");
    const res = await createBooking({ propId, date, time, userId });
    if (res.success) {
      alert(res.message);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-3">Book a Tour</h2>
      <div className="flex flex-col gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Book Tour
        </button>
        <Link href="/bookings">
          <button className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600">
            View My Bookings
          </button>
        </Link>
      </div>
    </div>
  );
}
