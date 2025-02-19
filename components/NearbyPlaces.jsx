import React from "react";
import { FaHospital, FaSchool } from "react-icons/fa";

async function fetchNearbyPlaces(lat, lng) {
  const radius = 4000; // 4 km
  const maxResults = 5;
  const url = `https://overpass-api.de/api/interpreter?data=[out:json];(node(around:${radius},${lat},${lng})["amenity"="hospital"];node(around:${radius},${lat},${lng})["amenity"="school"];);out ${maxResults};`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.log("Failed to fetch data from Overpass API");
      return []; // Return an empty array if the request fails
    }

    const data = await res.json();
    return data.elements || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array if an error occurs
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2); // Distance in km, rounded to 2 decimal places
}

const NearbyPlaces = async ({ lat, lng }) => {
  const places = await fetchNearbyPlaces(lat, lng); // Fetch data

  const hospitals = places.filter(
    (place) => place.tags?.amenity === "hospital"
  );
  const schools = places.filter((place) => place.tags?.amenity === "school");

  return (
    <div className="bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Nearby Places
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hospitals Column */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-red-600 flex items-center mb-4">
            <FaHospital className="mr-2 text-red-500" /> Hospitals
          </h2>
          {hospitals.length > 0 ? (
            <ul className="space-y-4">
              {hospitals.map((hospital) => {
                const distance = calculateDistance(
                  lat,
                  lng,
                  hospital.lat,
                  hospital.lon
                );
                return (
                  <li
                    key={hospital.id}
                    className="p-3 bg-red-50 rounded-lg flex items-start"
                  >
                    <FaHospital className="text-red-500 mr-4 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">
                        {hospital.tags?.name || "Unnamed Hospital"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {distance} km away
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500">No hospitals found nearby.</p>
          )}
        </div>

        {/* Schools Column */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold text-blue-600 flex items-center mb-4">
            <FaSchool className="mr-2 text-blue-500" /> Schools
          </h2>
          {schools.length > 0 ? (
            <ul className="space-y-4">
              {schools.map((school) => {
                const distance = calculateDistance(
                  lat,
                  lng,
                  school.lat,
                  school.lon
                );
                return (
                  <li
                    key={school.id}
                    className="p-3 bg-blue-50 rounded-lg flex items-start"
                  >
                    <FaSchool className="text-blue-500 mr-4 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">
                        {school.tags?.name || "Unnamed School"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {distance} km away
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500">No schools found nearby.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NearbyPlaces;
