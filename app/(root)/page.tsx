import SearchForm from "@/components/SearchForm";
import dynamic from "next/dynamic";
import React from "react";
// import PropertiesList from "@/components/PropertiesList";

const PropertiesList = dynamic(() => import("@/components/PropertiesList"), {
  loading: () => <p>Loading...</p>,
});
async function page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

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
        <PropertiesList />
      </section>
    </>
  );
}

export default page;
