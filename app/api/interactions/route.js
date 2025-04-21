// app/api/interactions/route.js
import connectDB from "@/lib/db";
import UserInteraction from "@/models/UserInteraction";

export async function POST(req) {
  await connectDB();
  const { userId, propertyId } = await req.json();

  if (!userId || !propertyId) {
    return new Response(JSON.stringify({ error: "Missing data" }), {
      status: 400,
    });
  }

  // Find or create interaction
  const interaction = await UserInteraction.findOneAndUpdate(
    { userId, propertyId },
    { $inc: { viewCount: 1 }, lastViewed: new Date() },
    { new: true, upsert: true }
  );

  return new Response(JSON.stringify(interaction), { status: 200 });
}
