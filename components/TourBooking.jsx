"use client";
import { createBooking } from "@/action/booking";
import { auth } from "@/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CalendarIcon, ClockIcon } from "lucide-react";

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
    <div className="p-4 border rounded-lg shadow-md bg-white w-full max-w-md">
      <h2 className="text-lg font-semibold">Request a tour</h2>
      <p className="text-gray-500 text-sm">
        Get a tour of the house as per your time.
      </p>

      {/* Date & Time Inputs */}
      <div className="flex flex-col gap-3 my-3">
        <div className="flex items-center border p-2 rounded-md">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full outline-none bg-transparent text-sm"
          />
          {/* <CalendarIcon className="h-4 w-4 text-gray-500" /> */}
        </div>

        <div className="flex items-center border p-2 rounded-md">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full outline-none bg-transparent text-sm"
          />
          {/* <ClockIcon className="h-4 w-4 text-gray-500" /> */}
        </div>
      </div>

      {/* Buttons */}
      <button
        onClick={handleBooking}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Schedule a Tour
      </button>

      <Link href="/bookings">
        <button className="w-full mt-2 border text-green-600 py-2 rounded-md hover:bg-gray-100">
          Request Info
        </button>
      </Link>
    </div>
  );
}
