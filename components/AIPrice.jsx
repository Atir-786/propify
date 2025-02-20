import connectDB from "@/lib/db";
import { Property } from "@/models/Property";

export default async function AIPricePrediction({ id }) {
  let price = null;

  await connectDB();
  try {
    const property = await Property.findById(id);
    if (!property) throw new Error("Property not found");

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

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        bedrooms: String(bedrooms),
        bathrooms: String(bathrooms),
        livingarea: String(livingArea),
        floors: String(floors),
        arhouse: String(totalHouseArea),
        builtyr: String(builtYear),
        lotarea: String(lotArea),
        grade: String(houseGrade),
        waterfront: String(waterfront),
      }),
    };

    const res = await fetch(
      "https://priceprediction-zdv5.onrender.com/predict",
      requestOptions
    );
    const data = await res.json();
    price = data.prediction;
  } catch (error) {
    console.error("Error fetching price prediction:", error);
  }

  return (
    <div
      className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/07/82/01/84/360_F_782018423_8Y5BkW9uG1zj9vrZRsuai7J1BPcigWOo.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-blue-900/70"></div>

      <div className="relative z-10 w-full max-w-md mx-auto bg-black/30 border border-purple-500/50 backdrop-blur-sm shadow-lg p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          AI Price Prediction
        </h2>
        {price === null ? (
          <div className="flex justify-center items-center h-24">
            <svg
              className="h-8 w-8 animate-spin text-purple-400"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="31.415, 31.415"
                strokeLinecap="round"
              ></circle>
            </svg>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-300 mb-2">Predicted Price:</p>
            <div className="relative inline-block">
              <span className="text-5xl font-bold text-white animate-pulse">
                ${price.toLocaleString()}
              </span>
              <div className="absolute inset-0 bg-purple-500 opacity-25 blur-xl animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
