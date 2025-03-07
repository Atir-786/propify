"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import PropertyDescription from "./PropertyDescription";
import VirtualTour from "./360Viewer";
import Link from "next/link";
import { FaVrCardboard } from "react-icons/fa";

const LeafletContainer = dynamic(
  () => import("@/components/LeafletContainer"),
  {
    loading: () => <p>Loading Leaflet...</p>,
  }
);

const ClientTabs = ({
  id,
  lat,
  lng,
  title,
  aiPrice,
  nearbyPlaces,
  description,
  features,
}) => {
  const [tab, setTab] = useState("description");

  return (
    <>
      <ul className=" border-b grid grid-cols-3 md:grid-cols-5">
        {[
          { key: "description", label: "Description" },

          { key: "location", label: "Location" },
          { key: "aiprice", label: "AI Price" },
          { key: "nearby places", label: "Nearby Places" },
          { key: "virtual tour", label: "Virtual Tour" },
        ].map(({ key, label }) => (
          <li key={key} className="mr-2">
            <button
              onClick={() => setTab(key)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                tab === key
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
      {tab === "description" && (
        <PropertyDescription description={description} features={features} />
      )}

      {tab === "location" && (
        <LeafletContainer lat={lat} lng={lng} title={title} />
      )}
      {tab === "aiprice" && aiPrice}
      {tab === "nearby places" && nearbyPlaces}
      {tab === "virtual tour" && (
        <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-200 text-center">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2 mb-4">
            <FaVrCardboard className="text-green-500 text-2xl" /> Virtual Tour
          </h3>
          <p className="text-gray-600 mb-4">
            Explore this property in a **360° virtual tour** from anywhere!
          </p>
          <Link
            href={`/property/${id}/virtual-tour`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-lg transition-all duration-300 shadow-md inline-block"
          >
            Start Tour
          </Link>
        </div>
      )}
    </>
  );
};

export default ClientTabs;
