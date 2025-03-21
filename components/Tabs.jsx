import AIPrice from "@/components/AIPrice";
import NearbyPlaces from "@/components/NearbyPlaces";
import PropertyDescription from "./PropertyDescription";
import LeafletContainer from "@/components/LeafletContainer";
import VirtualTour from "./360Viewer";
import Link from "next/link";
import { FaVrCardboard } from "react-icons/fa";
import TabsWrapper from "./TabsWrapper";
const Tabs = async ({ id, lat, lng, title }) => {
  return (
    <TabsWrapper>
      {/* Description Tab */}
      <div key="description">
        <PropertyDescription id={id} />
      </div>

      {/* Location Tab */}
      <div key="location">
        <LeafletContainer lat={lat} lng={lng} title={title} />
      </div>

      {/* AI Price Tab */}
      <div key="aiprice">
        <AIPrice id={id} />
      </div>

      {/* Nearby Places Tab */}
      <div key="nearby places">
        <NearbyPlaces lat={lat} lng={lng} />
      </div>

      {/* Virtual Tour Tab */}
      <div key="virtual tour">
        <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-200 text-center">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2 mb-4">
            <FaVrCardboard className="text-green-500 text-2xl" /> Virtual Tour
          </h3>
          <p className="text-gray-600 mb-4">
            Explore this property in a <strong>360° virtual tour</strong> from
            anywhere!
          </p>
          <Link
            href={`/property/${id}/virtual-tour`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-lg transition-all duration-300 shadow-md inline-block"
          >
            Start Tour
          </Link>
        </div>
      </div>
    </TabsWrapper>
  );
};

export default Tabs;
