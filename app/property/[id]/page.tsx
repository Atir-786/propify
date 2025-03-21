import connectDB from "@/lib/db";
import { Property } from "@/models/Property";
import { auth } from "@/auth";
import DeletePropertyButton from "@/components/DeletePropertyButton";
import SoldPropertyButton from "@/components/SoldPropertyButton";
import dynamic from "next/dynamic";
import PropertyActionButton from "@/components/PropertyActionButton";

const ImageSwiper = dynamic(() => import("@/components/client/ImageSwiper"), {
  loading: () => <p>Loading Images</p>,
});

import {
  FaBath,
  FaBed,
  FaRulerCombined,
  FaHome,
  FaCalendarAlt,
  FaLayerGroup,
  FaParking,
  FaCouch,
  FaDollarSign,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserCircle,
} from "react-icons/fa";
import TourBooking from "../../../components/TourBooking";
import Tabs from "@/components/Tabs";
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  const user = session?.user;
  // console.log(user);
  const userId = user?.id;
  // console.log(userId);
  const { id } = await params;
  // console.log(typeof id);
  await connectDB();
  try {
    console.log("finding");
    const property = await Property.findById(id);
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
      totalHouseArea,
      floors,
      builtYear,
      parking,
      ownerId,
      status,
    } = property;
    const owner = String(ownerId);
    // console.log("propertyid", _id, typeof _id);
    // console.log(String(ownerId) === userId);

    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6 bg-gray-50">
        <PropertyInfo
          title={title}
          price={price}
          status={status}
          address={{ address, city, state, country, zip }}
        />
        <ImageSwiper images={images} />

        <KeyDetails
          {...{
            bedrooms,
            bathrooms,
            landSize,
            totalHouseArea,
            builtYear,
            floors,
            parking,
          }}
        />
        <Amenities amenities={amenities} />
        <Tabs id={id} lat={lat} lng={lng} title={title} />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <TourBooking user={user} propId={String(_id)} />
          <SellerInfo name={name} email={email} phone={phone} />
        </div>
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

const iconMap = {
  bedrooms: <FaBed className="text-blue-500 text-2xl" />,
  bathrooms: <FaBath className="text-indigo-500 text-2xl" />,
  landSize: <FaRulerCombined className="text-green-500 text-2xl" />,
  totalHouseArea: <FaHome className="text-teal-500 text-2xl" />,
  builtYear: <FaCalendarAlt className="text-orange-500 text-2xl" />,
  floors: <FaLayerGroup className="text-purple-500 text-2xl" />,
  parking: <FaParking className="text-gray-500 text-2xl" />,
};

const KeyDetails = (props) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white shadow-xl rounded-xl p-6 border border-gray-200">
    {Object.entries(props).map(([key, value]) =>
      value !== undefined && value !== null ? (
        <div key={key} className="flex flex-col items-center text-gray-700">
          {iconMap[key] || <FaHome className="text-gray-400 text-2xl" />}
          <span className="font-medium text-center mt-2 capitalize">
            {key.replace(/([A-Z])/g, " $1")}:{" "}
            <span className="font-semibold">{String(value)}</span>
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

const SellerInfo = ({ name, email, phone }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-80 text-center">
      <FaUserCircle className="w-24 h-24 mx-auto text-gray-400" />
      <h2 className="text-xl font-semibold text-gray-800 mt-4">{name}</h2>
      <p className="text-gray-500 text-sm">Property Owner</p>

      <div className="mt-4 text-left">
        <p className="flex items-center gap-2 text-gray-700">
          <FaEnvelope className="text-gray-500" /> {email}
        </p>
        <p className="flex items-center gap-2 text-gray-700 mt-2">
          <FaPhoneAlt className="text-gray-500" /> {phone}
        </p>
      </div>

      <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full w-full">
        View Profile
      </button>
    </div>
  );
};

export default page;
