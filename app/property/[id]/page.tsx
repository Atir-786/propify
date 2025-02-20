import connectDB from "@/lib/db";
import { Property } from "@/models/Property";
import { ObjectId } from "mongodb";
// import ImageSwiper from "@/components/client/ImageSwiper";
// import LeafletMap from "@/components/client/LeafletMap";
import { auth } from "@/auth";
import DeletePropertyButton from "@/components/DeletePropertyButton";
import SoldPropertyButton from "@/components/SoldPropertyButton";
import dynamic from "next/dynamic";
import PropertyActionButton from "@/components/PropertyActionButton";
const NearbyPlaces = dynamic(() => import("@/components/NearbyPlaces"), {
  loading: () => <p>Loading Nearby Places</p>,
});
const ImageSwiper = dynamic(() => import("@/components/client/ImageSwiper"), {
  loading: () => <p>Loading Images</p>,
});
const LeafletContainer = dynamic(
  () => import("@/components/LeafletContainer"),
  {
    loading: () => <p>Loading Leaflet</p>,
  }
);
import AIPrice from "@/components/AIPrice";
import {
  FaAlignLeft,
  FaBath,
  FaBed,
  FaBuilding,
  FaCalendar,
  FaCouch,
  FaDollarSign,
  FaEnvelope,
  FaHome,
  FaListAlt,
  FaMapMarkerAlt,
  FaParking,
  FaPhoneAlt,
  FaRulerCombined,
  FaUser,
  FaVrCardboard,
} from "react-icons/fa";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  const user = session?.user;
  console.log(user);
  const userId = user?.id;
  console.log(userId);
  const { id } = await params;
  console.log(typeof id);
  await connectDB();
  try {
    console.log("finding");
    const property = await Property.findById(id);
    console.log(property);
    const {
      _id,
      title,
      description,
      price,
      propertyType,
      address,
      city,
      state,
      country,
      zip,
      lat,
      lng,
      name,
      email,
      phone,
      amenities,
      features,
      images,
      bedrooms,
      bathrooms,
      landSize,
      totalHouseArea,
      lotArea,
      livingArea,
      livingAreaRenovated,
      floors,
      houseGrade,
      builtYear,
      parking,
      ownerId,
      virtualImages,
      status,
    } = property;
    const owner = String(ownerId);
    // console.log("propertyid", _id, typeof _id);
    // console.log(String(ownerId) === userId);
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6 bg-gray-50">
        <ImageSwiper images={images} />
        <PropertyInfo
          title={title}
          price={price}
          status={status}
          address={{ address, city, state, country, zip }}
        />
        <KeyDetails
          {...{
            bedrooms,
            bathrooms,
            landSize,
            totalHouseArea,
            lotArea,
            livingArea,
            livingAreaRenovated,
            builtYear,
            houseGrade,
            floors,
            parking,
          }}
        />
        <Amenities amenities={amenities} />
        <PropertyDescription description={description} features={features} />
        {virtualImages.length > 0 && <VirtualTour propertyId={_id} />}
        <AIPricePrediction id={id} />
        <PropertyLocation lat={lat} lng={lng} title={title} />
        <NearbyPlaces lat={lat} lng={lng} />
        <SellerInfo name={name} email={email} phone={phone} />
        {String(ownerId) === userId && (
          <>
            <div className="flex gap-4 justify-end">
              <>
                {(status === "reserved" || status === "active") && (
                  <PropertyActionButton
                    id={id}
                    ownerId={String(ownerId)}
                    action="markAsSold"
                    label="Mark as Sold"
                    className="bg-orange-400"
                  />
                )}
                {(status === "sold" || status === "active") && (
                  <PropertyActionButton
                    id={id}
                    ownerId={String(ownerId)}
                    action="markAsReserved"
                    label="Mark as Reserved"
                    className="bg-yellow-500"
                  />
                )}
                {(status === "sold" || status === "reserved") && (
                  <PropertyActionButton
                    id={id}
                    ownerId={String(ownerId)}
                    action="markAsActive"
                    label="Mark as Active"
                    className="bg-green-500"
                  />
                )}
              </>

              <DeletePropertyButton id={id} ownerId={String(ownerId)} />
            </div>
          </>
        )}
        {user?.role === "admin" && status === "pending" && (
          <PropertyActionButton
            id={id}
            ownerId={String(ownerId)}
            action="markAsActive"
            label="Mark as Active"
            className="bg-blue-500"
          />
        )}
      </div>
    );
  } catch (error) {
    console.error("error fetching Property ", error);
    return (
      <div>
        <h1>Error loading property</h1>
        <p>{error.message}</p>
      </div>
    );
  }
};
const PropertyInfo = ({ status, title, price, address }) => (
  <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200 flex flex-col gap-2">
    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
      <FaHome className="text-green-500" /> {title}
    </h2>
    <h1>{status}</h1>
    <p className="text-xl font-semibold text-green-700 flex items-center gap-2">
      <FaDollarSign className="text-green-500" /> ${price.toLocaleString()}
    </p>
    <p className="text-gray-600 flex items-center gap-2">
      <FaMapMarkerAlt className="text-red-500" /> {address.address},{" "}
      {address.city}, {address.state}, {address.country}, {address.zip}
    </p>
  </div>
);

const KeyDetails = (props) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white shadow-xl rounded-xl p-6 border border-gray-200">
    {Object.entries(props).map(([key, value]) =>
      value !== undefined && value !== null ? (
        <div key={key} className="flex flex-col items-center text-gray-700">
          <FaBuilding className="text-teal-500 text-2xl" />
          <span className="font-medium text-center mt-2">
            {key.replace(/([A-Z])/g, " $1")}: {String(value)}
          </span>
        </div>
      ) : null
    )}
  </div>
);

const Amenities = ({ amenities }) => (
  <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-3">
      <FaCouch className="text-purple-500" /> Amenities
    </h3>
    <div className="flex flex-wrap gap-3">
      {amenities.map((amenity, index) => (
        <span
          key={index}
          className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg shadow-md"
        >
          {amenity}
        </span>
      ))}
    </div>
  </div>
);

const PropertyDescription = ({ description, features }) => (
  <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-3">
      <FaAlignLeft className="text-green-500" /> Property Description
    </h3>
    <p className="text-gray-600">{description || "No description provided."}</p>
    {features && (
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-3">
          <FaListAlt className="text-blue-500" /> Features
        </h3>
        <p className="text-gray-600">{features}</p>
      </div>
    )}
  </div>
);

const VirtualTour = ({ propertyId }) => (
  <div className="bg-gray-50 shadow-lg rounded-lg p-6 border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-3">
      <FaVrCardboard className="text-green-500" /> Virtual Tour
    </h3>
    <Link
      href={`/property/${propertyId}/virtual-tour`}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Click Me
    </Link>
  </div>
);

const AIPricePrediction = ({ id }) => (
  <div className="bg-gray-50 shadow-lg rounded-lg p-6 border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-3">
      <FaAlignLeft className="text-green-500" /> AI Price Prediction
    </h3>
    <AIPrice id={id} />
  </div>
);

const PropertyLocation = ({ lat, lng, title }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
    <h2 className="text-2xl font-semibold text-gray-700">Property Location</h2>
    <LeafletContainer lat={lat} lng={lng} title={title} />
  </div>
);

const SellerInfo = ({ name, email, phone }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
    <h2 className="text-2xl font-semibold text-gray-800">Seller Information</h2>
    <p>
      <FaUser /> {name}
    </p>
    <p>
      <FaEnvelope /> {email}
    </p>
    <p>
      <FaPhoneAlt /> {phone}
    </p>
  </div>
);

export default page;
