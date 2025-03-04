"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/client/LeafletMap"), {
  loading: () => <p>Loading map...</p>,
  ssr: false, // This prevents SSR for Leaflet
});

const ClientWrapper = ({ lat, lng, title }) => {
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-700">
          Property Location
        </h2>
        <LeafletMap lat={lat} lng={lng} title={title} />;
      </div>
    </>
  );
};

export default ClientWrapper;
