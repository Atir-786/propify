import connectDB from "@/lib/db";
import { Property } from "@/models/Property";
import { ObjectId } from "mongodb";
import ImageSwiper from "@/components/client/ImageSwiper";
import Image from "next/image";
import LeafletMap from "@/components/client/LeafletMap";
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // console.log(params);
  await connectDB();
  try {
    console.log("finding");
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
      phone,
      images,
    } = property;
    return (
      <div className="max-w-5xl mx-auto p-6">
        <ImageSwiper images={images} />

        {/* Property Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="">
            <p className="text-gray-600 mb-2">{title}</p>
            <p className="text-gray-600 mb-2">
              Address: {address}, {city}, {state}, {country}, {zip}
            </p>
            <p className="text-lg text-gray-800 font-semibold mb-2">
              Price: ${price.toLocaleString()}
            </p>
            <p className="text-gray-600 mb-2">
              Property Type:{" "}
              <span className="font-semibold">{propertyType}</span>
            </p>

            <p className="text-gray-600 mb-2">{description}</p>
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
              Contact: <span className="font-semibold">{phone}</span>
            </p>
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
