"use server";
import connectDB from "@/lib/db";
import { Booking } from "@/models/Booking";
import { Property } from "@/models/Property";
import { User } from "lucide-react";

async function createBooking({ propId, date, time, userId }) {
  try {
    if (!propId || !date || !time || !userId) {
      throw new Error("Missing required fields.");
    }
    // console.log(time, date, typeof date, typeof time);
    await connectDB();
    // Check if the property exists
    const property = await Property.findById(propId);
    if (!property) {
      throw new Error("Property not found.");
    }
    console.log("finding proeprty");

    // Create the booking
    const booking = await Booking.create({
      propertyId: propId,
      userId,
      ownerId: property.ownerId,
      date,
      time,
      status: "pending",
    });
    console.log(booking);
    // Send email notification to the seller
    // await sendEmail({
    //   to: seller.email,
    //   subject: "New Property Tour Booking Request",
    //   text: `A new tour has been booked for your property.
    //           Date: ${date}, Time: ${time}.
    //           Please approve or reject the request.`,
    // });

    return { success: true, message: "Booking request sent to seller." };
  } catch (error) {
    console.error("Booking Error:", error.message);
    return { success: false, message: error.message };
  }
}
async function updateBookingStatus(
  bookingId: string,
  status: "approved" | "rejected"
) {
  try {
    await connectDB();

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      throw new Error("Booking not found.");
    }

    // Revalidate the MyBookings page so UI updates

    return { success: true, message: `Booking ${status}` };
  } catch (error) {
    console.error("Error updating booking status:", error);
    return { success: false, message: "Failed to update booking status." };
  }
}
export { createBooking, updateBookingStatus };
