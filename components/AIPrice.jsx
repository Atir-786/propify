"use client";
import { useEffect, useState } from "react";
import { FaAlignLeft } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";

function AIPrice({ id }) {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState("LinearRegression");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchPrice() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const json = await res.json();
      if (json.error) throw new Error(json.error);
      if (!json.modelPredictions) throw new Error("Invalid data format");

      setData(json.modelPredictions);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <FaAlignLeft className="text-green-600" />
        AI Price Prediction
      </h3>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-green-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-600 bg-red-100 p-4 rounded-md flex items-center gap-3">
          <FiAlertCircle className="text-xl" />
          <div>
            <p className="font-medium">Error:</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={fetchPrice}
              className="mt-2 text-sm underline text-blue-600 hover:text-blue-800"
            >
              Retry
            </button>
          </div>
        </div>
      ) : data ? (
        <>
          <p className="text-gray-600 text-sm mb-4">
            Our AI models analyze market trends, property features, and location
            to provide the most accurate price estimation.
          </p>

          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">
              Select AI Model
            </label>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {Object.keys(data).map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div
            className="relative min-h-[300px] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat rounded-xl"
            style={{
              backgroundImage:
                "url('https://t3.ftcdn.net/jpg/07/82/01/84/360_F_782018423_8Y5BkW9uG1zj9vrZRsuai7J1BPcigWOo.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-gray-900/70 rounded-xl"></div>

            <div className="relative z-10 w-full max-w-md mx-auto bg-black/40 border border-purple-500/40 backdrop-blur-sm shadow-md p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-center text-white mb-4">
                Predicted Price
              </h2>
              <div className="text-center">
                <p className="text-sm text-gray-300 mb-2">
                  Model:{" "}
                  <span className="font-medium text-white">{selected}</span>
                </p>
                <div className="relative inline-block">
                  <span className="text-4xl font-bold text-green-300 animate-pulse">
                    {/* ${" "} */}
                    {Math.abs(parseFloat(data[selected])).toLocaleString(
                      "en-US",
                      {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 2,
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No prediction data found.</p>
      )}
    </div>
  );
}

export default AIPrice;
