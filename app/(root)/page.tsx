import SearchForm from "@/components/SearchForm";
import React from "react";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/lib/db";
import { Property } from "@/models/Property";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  await connectDB();
  const properties = await Property.find({});
  console.log(properties);

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
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property}></PropertyCard>
          ))}
        </ul>
      </section>
    </>
  );
}

export default page;
