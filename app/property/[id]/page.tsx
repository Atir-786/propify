import connectDB from "@/lib/db";
import { Property } from "@/models/Property";
import { ObjectId } from "mongodb";
import ImageSwiper from "@/components/client/ImageSwiper";
import LeafletMap from "@/components/client/LeafletMap";
import NearbyPlaces from "@/components/NearbyPlaces";
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
        <div className="bg-gray-50 shadow-md rounded-lg p-6 max-w-lg ">
          <p className="text-xl font-bold text-gray-800 mb-4">{title}</p>

          <p className="text-gray-700 mb-3">
            <span className="font-medium text-gray-900">Address:</span>
            {address}, {city}, {state}, {country}, {zip}
          </p>

          <p className="text-lg text-green-700 font-semibold mb-3">
            Price: ${price.toLocaleString()}
          </p>
        </div>
        <ImageSwiper images={images} />

        {/* Property Details */}
        {/* <div className="md:grid-cols-2"> */}
        <div className="mt-6 grid grid-cols-1  gap-6">
          <div className="bg-gray-50 shadow-md rounded-lg p-6 max-w-lg ">
            {/* <p className="text-xl font-bold text-gray-800 mb-4">{title}</p> */}

            {/* <p className="text-gray-700 mb-3">
              <span className="font-medium text-gray-900">Address:</span>
              {address}, {city}, {state}, {country}, {zip}
            </p> */}

            {/* <p className="text-lg text-green-700 font-semibold mb-3">
              Price: ${price.toLocaleString()}
            </p> */}

            <p className="text-gray-700 mb-3">
              <span className="font-medium text-gray-900">Property Type:</span>
              <span className="font-semibold">{propertyType}</span>
            </p>

            <p className="text-gray-700 mb-3">Description:{description}</p>
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
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md ">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
              Seller Information
            </h2>
            <p className="text-gray-700 mb-3">
              <span className="font-medium text-gray-900">Name:</span>
              <span className="font-semibold ml-2">{name}</span>
            </p>
            <p className="text-gray-700 mb-3">
              <span className="font-medium text-gray-900">Email:</span>
              <a
                href={`mailto:${email}`}
                className="text-blue-600 font-semibold hover:underline ml-2"
              >
                {email}
              </a>
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Contact:</span>
              <span className="font-semibold ml-2">{phone}</span>
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
