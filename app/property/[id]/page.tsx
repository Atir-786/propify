import connectDB from "@/lib/db";
import { Property } from "@/models/Property";
import { ObjectId } from "mongodb";
import ImageSwiper from "@/components/client/ImageSwiper";
import LeafletMap from "@/components/client/LeafletMap";
import { auth } from "@/auth";
import DeletePropertyButton from "@/components/DeletePropertyButton";
import dynamic from "next/dynamic";
const NearbyPlaces = dynamic(() => import("@/components/NearbyPlaces"), {
  loading: () => <p>Loading Nearby Places</p>,
});
import {
  FaAlignLeft,
  FaBath,
  FaBed,
  FaBuilding,
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
} from "react-icons/fa";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;
  console.log(userId);
  const { id } = await params;
  console.log(typeof id);
  await connectDB();
  try {
    console.log("finding");
    const property = await Property.findOne({ _id: new ObjectId(id) });
    // console.log(property);
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
      houseSize,
      parkingArea,
      ownerId,
    } = property;
    const owner = String(ownerId);
    // console.log("propertyid", _id, typeof _id);
    // console.log(String(ownerId) === userId);
    return (
      <div className="max-w-4xl mx-auto p-6">
        <ImageSwiper images={images} />
        <div className="mt-6">
          {/* Property Details */}
          <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto border border-gray-200">
            {/* Property Name & Price */}
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaHome className="text-green-500" /> {title}
              </h2>
              <p className="text-xl font-semibold text-green-700 flex items-center gap-2">
                <FaDollarSign className="text-green-500" /> $
                {price.toLocaleString()}
              </p>
            </div>

            {/* Address Section */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-1 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" /> Address
              </h3>
              <p className="text-gray-600">
                {address}, {city}, {state}, {country}, {zip}
              </p>
            </div>
            {/* Key Property Details */}
            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <FaBed className="text-blue-500" />
                <span className="font-medium">{bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaBath className="text-purple-500" />
                <span className="font-medium">{bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaRulerCombined className="text-orange-500" />
                <span className="font-medium">{landSize} sq. ft. Land</span>
              </div>
              {houseSize && (
                <div className="flex items-center gap-2 text-gray-700">
                  <FaBuilding className="text-teal-500" />
                  <span className="font-medium">{houseSize} sq. ft. House</span>
                </div>
              )}
              {parkingArea && (
                <div className="flex items-center gap-2 text-gray-700">
                  <FaParking className="text-gray-500" />
                  <span className="font-medium">
                    {parkingArea} sq. ft. Parking
                  </span>
                </div>
              )}
            </div>
            {/* Amenities Section */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaCouch className="text-purple-500" /> Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full shadow-md"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div className="mt-4">
              <p className="text-gray-700">
                <span className="font-semibold text-gray-900">
                  Property Type:
                  {propertyType}
                </span>
              </p>
            </div>
          </div>
          <div className="bg-gray-50 shadow-md rounded-lg p-6 mt-6 max-w-4xl mx-auto border border-gray-200">
            {/* Property Description Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-3">
                <FaAlignLeft className="text-green-500" /> Property Description
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {description || "No description provided by the seller."}
              </p>
            </div>

            {/* Additional Features Section */}
            {features && (
              <div>
                <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-3">
                  <FaListAlt className="text-blue-500" /> Other Features
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {features || "No additional features provided."}
                </p>
              </div>
            )}
          </div>
          {/* Property Location */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Property Location
            </h2>
            <div className="w-full h-80">
              <LeafletMap lat={lat} lng={lng} title={title} />
            </div>
          </div>
          {/* {Nearby places} */}
          <NearbyPlaces lat={lat} lng={lng} />
          {/* Seller Details */}
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto border border-gray-200">
            {/* Seller Info Header */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2 flex items-center gap-2">
              <FaUser className="text-green-500" /> Seller Information
            </h2>

            {/* Seller Name */}
            <p className="text-gray-700 mb-3">
              <span className="font-medium text-gray-900">Name:</span>
              <span className="font-semibold ml-2">{name}</span>
            </p>

            {/* Seller Email */}
            <p className="text-gray-700 mb-3">
              <span className="font-medium text-gray-900">Email:</span>
              <a
                href={`mailto:${email}`}
                className="text-blue-600 font-semibold hover:underline ml-2 flex items-center gap-1"
              >
                <FaEnvelope className="text-blue-600" /> {email}
              </a>
            </p>

            {/* Seller Phone */}
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Contact:</span>
              <span className="font-semibold ml-2 flex items-center gap-1">
                <FaPhoneAlt className="text-gray-600" /> {phone}
              </span>
            </p>
          </div>
        </div>
        {ownerId == userId && (
          <>
            {/* <h1>Hello</h1> */}
            <DeletePropertyButton id={id} ownerId={owner} />
          </>
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

export default page;
