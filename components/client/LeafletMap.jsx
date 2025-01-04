"use client";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const LeafletMap = ({ lat, lng, title }) => {
  const position = [51.505, -0.09];
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={markerIcon}>
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
