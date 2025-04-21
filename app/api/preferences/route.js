// app/api/preferences/route.js
import connectDB from "@/lib/db";
import UserInteraction from "@/models/UserInteraction";
import { Property } from "@/models/Property";
import UserPreference from "@/models/UserPreference";

export async function POST(req) {
  await connectDB();
  const { userId } = await req.json();
  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing userId" }), {
      status: 400,
    });
  }

  const interactions = await UserInteraction.find({ userId });
  if (!interactions.length)
    return new Response(JSON.stringify({ message: "No interactions found" }), {
      status: 200,
    });

  // Variables to track location, status, and price
  let locationCounts = {};
  let priceRanges = [];
  let statuses = {};

  for (let interaction of interactions) {
    const property = await Property.findById(interaction.propertyId);
    if (!property) continue;

    // Count locations
    locationCounts[property.address] =
      (locationCounts[property.address] || 0) + interaction.viewCount;

    // Track price ranges
    priceRanges.push(property.price);

    // Count statuses
    statuses[property.status] =
      (statuses[property.status] || 0) + interaction.viewCount;
  }
  // console.log("location counts", locationCounts);
  // Calculate preferred location and status
  const preferredLocation =
    Object.entries(locationCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  const preferredStatus =
    Object.entries(statuses).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  console.log("prefered lcoation is ", preferredLocation);
  // Calculate price range
  const minPrice = Math.min(...priceRanges);
  const maxPrice = Math.max(...priceRanges);

  // Update or create user preferences
  const preferences = await UserPreference.findOneAndUpdate(
    { userId },
    {
      preferredLocation,
      preferredPriceRange: { min: minPrice, max: maxPrice },
      preferredStatus,
    },
    { new: true, upsert: true }
  );

  return new Response(JSON.stringify(preferences), { status: 200 });
}
