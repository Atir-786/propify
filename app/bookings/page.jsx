import Link from "next/link";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { Booking } from "@/models/Booking";
import { Property } from "@/models/Property";
import OwnerBookings from "@/components/OwnerBookings"; // Client component
import { redirect } from "next/navigation";

export default async function MyBookings() {
  const session = await auth();
  if (!session) {
    console.log("it should be redirectd");
    redirect("/login");
  }

  await connectDB();
  const userId = session?.user?.id;

  // Fetch bookings made by the user
  const userBookings = await Booking.find({ userId }).sort({ date: -1 }).lean();

  // Fetch properties owned by the user
  const properties = await Property.find({ ownerId: userId }).lean();
  const propertyIds = properties.map((p) => p._id.toString());

  // Fetch bookings for user's properties
  const ownerBookings = await Booking.find({ propertyId: { $in: propertyIds } })
    .sort({ date: -1 })
    .lean();

  // Convert MongoDB objects to plain JSON (Fix for Client Component)
  const formattedOwnerBookings = ownerBookings.map((booking) => ({
    _id: booking._id.toString(),
    propertyId: booking.propertyId.toString(),
    userId: booking.userId.toString(),
    date: booking.date.toISOString(),
    time: booking.time,
    status: booking.status,
  }));

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {/* Bookings made by the user (Server Component) */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Bookings I Made</h3>
        {userBookings.length === 0 ? (
          <p className="text-gray-500">No bookings made yet.</p>
        ) : (
          userBookings.map((booking) => (
            <div
              key={booking._id.toString()}
              className="border p-4 rounded-lg shadow-md bg-white mb-3"
            >
              <p>Date: {new Date(booking.date).toDateString()}</p>
              <p>Time: {booking.time}</p>
              <p
                className={`font-semibold ${
                  booking.status === "pending"
                    ? "text-yellow-500"
                    : booking.status === "approved"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Status: {booking.status}
              </p>
              <Link
                href={`/property/${booking.propertyId.toString()}`}
                className="text-blue-500 underline"
              >
                View Property
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Bookings for My Properties (Client Component) */}
      <OwnerBookings bookings={formattedOwnerBookings} />
    </div>
  );
}
