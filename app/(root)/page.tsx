import SearchForm from "@/components/SearchForm";
import React from "react";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/lib/db";
import { Property } from "@/models/Property";
// type Property = {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   location: string;
//   // images?: string[];
// };
async function page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  await connectDB();
  const properties = await Property.find({});
  // const propertiesData: Property[] = properties.map((property) => ({
  //   _id: property._id.toString(),
  //   title: property.title,
  //   description: property.description,
  //   price: property.price,
  //   location: property.location,
  //   images: property.images || [],
  // }));

  const posts = [
    {
      _createdAt: new Date(),
      views: 50,
      author: { _id: 1, name: "Adrian" },
      description: "this is the description",
      image:
        "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "large",
      title: "A beautiful mansion",
    },
  ];

  // const response = await()
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Showcase Properties ,
          <br /> Connect with Real Estate
        </h1>
        <p className="sub-heading !max-w-3xl">
          Find the perfect home, apartment, or land with ease. Explore a wide
          range of properties for sale or rent, and make your next move a
          breeze.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30 semi-bold">
          {query ? `Search results for ${query}` : "All Properties"}
        </p>
        {/* <ul className="mt-7 card_grid">
          {posts.map((post: PropertyCardType, index: number) => (
            <PropertyCard key={post.id} post={post} />
          ))}
        </ul> */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {properties.map((post) => (
            <PropertyCard key={post._id} post={post}></PropertyCard>
          ))}
        </ul>
      </section>
    </>
  );
}

export default page;
