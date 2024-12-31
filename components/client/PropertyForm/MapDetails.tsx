import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const MapDetails = ({ register, coordinates, setCoordinates }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Step 5: Drag the location</h2>
      <p>Lat{coordinates.lat}</p>
      <p>Lon{coordinates.lon}</p>
      {coordinates ? (
        <>
          <input
            type="hidden"
            {...register("lat", { required: "Latitude is required" })}
            value={coordinates.lat || ""}
          />
          <input
            type="hidden"
            {...register("lng", {
              required: "Longitude is required",
            })}
            value={coordinates.lon || ""}
          />
          <MapContainer
            center={coordinates}
            zoom={15}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={coordinates}
              draggable
              icon={markerIcon}
              eventHandlers={{
                dragend: (event) => {
                  const { lat, lng } = event.target.getLatLng();
                  setCoordinates({ lat, lon: lng });
                },
              }}
            ></Marker>
          </MapContainer>
        </>
      ) : (
        <p>Unable to load map. Please try again.</p>
      )}
    </>
  );
};

export default MapDetails;
