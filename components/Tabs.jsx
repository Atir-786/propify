import AIPrice from "@/components/AIPrice";
import NearbyPlaces from "@/components/NearbyPlaces";
import ClientTabs from "./ClientTabs"; // Import the client-side tab switcher

const Tabs = async ({ id, lat, lng, title, description, features }) => {
  return (
    <ClientTabs
      id={id}
      lat={lat}
      lng={lng}
      title={title}
      description={description}
      aiPrice={<AIPrice id={id} />}
      nearbyPlaces={<NearbyPlaces lat={lat} lng={lng} />}
    />
  );
};

export default Tabs;
