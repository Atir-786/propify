import { NextResponse } from "next/server";

export async function POST(req) {
  const {
    description,
    bedrooms,
    bathrooms,
    floors,
    totalHouseArea,
    builtYear,
  } = await req.json();

  const prompt = `
  Improve the following property description while adding details about the property:

  User's Description: "${description}"

  Property Details:
  - Bedrooms: ${bedrooms}
  - Bathrooms: ${bathrooms}
  - Total House Area: ${totalHouseArea} sq.ft
  - Floors: ${floors}
  - Built Year: ${builtYear}

  The generated description should be engaging, informative, and highlight key features.`;
  console.log("requesting");
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini", // or 'gpt-3.5-turbo'
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
    }),
  });
  const data = await response.json();
  console.log(data);
  const generatedDescription = data.choices[0].message.content.trim();
  return NextResponse.json({ description: generatedDescription });
  // return NextResponse.json({ description: "HELLO" });
}
