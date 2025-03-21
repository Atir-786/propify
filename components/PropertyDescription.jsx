import connectDB from "@/lib/db";
import { Property } from "@/models/Property";
export default async function PropertyDescription({ id }) {
  await connectDB();
  let AIdescription = "";
  try {
    const property = await Property.findById(id);

    if (!property) {
      console.log("Property not found");
      throw new Error("Property not found");
    }
    const {
      description,
      bedrooms,
      bathrooms,
      totalHouseArea,
      floors,
      builtYear,
      amenities,
      address,
    } = property;
    const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions";
    const openRouterToken = process.env.OPENROUTER_API_KEY; // Store your key in .env

    const prompt = `
    Improve the following property description while adding details about the property:
    
    User's Description: "${description}"
    
    Property Details:
    - Bedrooms: ${bedrooms}
    - Bathrooms: ${bathrooms}
    - Total House Area: ${totalHouseArea} sq.ft
    - Floors: ${floors}
    - Built Year: ${builtYear}
    - Amenities: ${amenities}
    - Address: ${address}
    
    The generated description should be engaging, informative, and highlight key features.
    `;

    const response = await fetch(openRouterUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openRouterToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // You can try other models too
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that generates property descriptions.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    // console.log(data);
    AIdescription = data.choices?.[0]?.message?.content;
    // console.log(AIdescription);

    return (
      <div className="space-y-4">
        {/* <h2 className="text-2xl font-semibold text-gray-800">
          Property Description
        </h2> */}
        <p className="text-gray-700">{AIdescription}</p>
      </div>
    );
  } catch (error) {
    console.error(
      "Error fetching property or generating AI description:",
      error
    );
    return <p className="text-red-500">Failed to load property description.</p>;
  }
}
