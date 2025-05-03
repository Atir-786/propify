// app/api/ai-price/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Property } from "@/models/Property";

export async function POST(req) {
  const { id } = await req.json();

  try {
    await connectDB();
    const property = await Property.findById(id);
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const {
      bedrooms,
      bathrooms,
      livingArea,
      floors,
      totalHouseArea,
      builtYear,
      lotArea,
      houseGrade,
      waterfront = 0,
    } = property;

    // Call your ML API
    const mlRes = await fetch(
      "https://multi-prediction-api.onrender.com/predict",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bedrooms,
          bathrooms,
          livingarea: livingArea,
          floors,
          arhouse: totalHouseArea,
          builtyr: builtYear,
          lotarea: lotArea,
          grade: houseGrade,
          waterfront,
        }),
      }
    );

    const predictions = await mlRes.json();

    return NextResponse.json({ modelPredictions: predictions });
    // return NextResponse.json({ LinearRegression: 1212, RandomForeset: 797 });
  } catch (err) {
    console.error("AI price error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
