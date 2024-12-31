import connectDB from "@/lib/db";
import { Property } from "@/models/Property";
import { ObjectId } from "mongodb";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/swiper.min.css";

// Import icons for Leaflet
// import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import logo from "../../../public/logo.png";
import Image from "next/image";
// Fix Leaflet marker icon path
// const defaultIcon = L.icon({
//   iconUrl: logo.src,
//   shadowUrl: markerShadow.src,
// });
// L.Marker.prototype.options.icon = defaultIcon;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // console.log(params);
  await connectDB();
  try {
    const property = await Property.findOne({ _id: new ObjectId(id) });
    const {
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
      contact,
      images,
    } = property;
    return (
      <div className="max-w-5xl mx-auto p-6">
        {/* Title Section */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>

        {/* Swiper Image Slider */}
        {/* <Swiper spaceBetween={10} slidesPerView={1}>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                alt={`Property Image ${index + 1}`}
                className="w-full h-80 object-cover rounded-md"
              />
            </SwiperSlide>
          ))}
        </Swiper> */}

        {/* Property Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Details
            </h2>
            <p className="text-gray-600 mb-2">{description}</p>
            <p className="text-lg text-gray-800 font-semibold mb-2">
              Price: ${price.toLocaleString()}
            </p>
            <p className="text-gray-600 mb-2">
              Property Type:{" "}
              <span className="font-semibold">{propertyType}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Address: {address}, {city}, {state}, {country}, {zip}
            </p>
          </div>

          {/* Seller Details */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Seller Information
            </h2>
            <p className="text-gray-600 mb-2">
              Name: <span className="font-semibold">{name}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Email:{" "}
              <a
                href={`mailto:${email}`}
                className="text-blue-600 hover:underline"
              >
                {email}
              </a>
            </p>
            <p className="text-gray-600">
              Contact: <span className="font-semibold">{contact}</span>
            </p>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Property Location
          </h2>
          <div className="w-full h-80">
            {/* <MapContainer
              center={[lat, lng]}
              zoom={13}
              scrollWheelZoom={false}
              className="w-full h-full rounded-md"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[lat, lng]}>
                <Popup>{title}</Popup>
              </Marker>
            </MapContainer> */}
          </div>
        </div>
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
