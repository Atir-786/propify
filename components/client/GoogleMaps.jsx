"use client";
import { useJsApiLoader } from "@react-google-maps/api";
import React from "react";

const GoogleMaps = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC3DPyTDFp5CPo89e7nLHRsn4WzqfHG5kE",
  });
  if (!isLoaded) {
    return <p>Loading</p>;
  }
  return <div>GoogleMaps</div>;
};

export default GoogleMaps;
