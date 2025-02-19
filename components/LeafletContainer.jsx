"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/client/LeafletMap"), {
  loading: () => <p>Loading map...</p>,
  ssr: false, // This prevents SSR for Leaflet
});

const ClientWrapper = ({ lat, lng, title }) => {
  return <LeafletMap lat={lat} lng={lng} title={title} />;
};

export default ClientWrapper;
