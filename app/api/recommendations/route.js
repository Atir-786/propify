// app/api/recommendations/route.js
import connectDB from "@/lib/db";
import { Property } from "@/models/Property";
import UserPreference from "@/models/UserPreference";

export async function POST(req) {
  await connectDB();
  const { userId } = await req.json();
  if (!userId)
    return new Response(JSON.stringify({ error: "Missing userId" }), {
      status: 400,
    });

  const userPref = await UserPreference.findOne({ userId });
  if (!userPref)
    return new Response(JSON.stringify({ message: "No preferences found" }), {
      status: 200,
    });
  // console.log("user preferences in recom", userPref);
  const { preferredLocation, preferredPriceRange, preferredStatus } = userPref;
  const query = {};

  // Build query for location filter
  if (preferredLocation) {
    query.address = preferredLocation;
  }

  // Build query for price range filter
  if (preferredPriceRange?.min || preferredPriceRange?.max) {
    query.price = {};
    if (preferredPriceRange.min) query.price.$gte = preferredPriceRange.min;
    if (preferredPriceRange.max) query.price.$lte = preferredPriceRange.max;
  }

  // Build query for status filter
  if (preferredStatus) {
    query.status = preferredStatus;
  }

  // Fetch the recommended properties based on the query
  const recommendations = await Property.find(query).limit(10);
  // console.log("Recommendations in api routes:", recommendations);

  return new Response(JSON.stringify(recommendations), { status: 200 });
}
