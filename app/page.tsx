import SearchForm from "@/components/SearchForm";
import dynamic from "next/dynamic";
import React from "react";

const PropertiesList = dynamic(() => import("@/components/PropertiesList"), {
  loading: () => <p>Loading...</p>,
});

async function page() {
  return (
    <>
      {/* Hero Section */}
      <section className="pink_container">
        <h1 className="heading">
          Showcase Properties, <br /> Connect with Real Estate
        </h1>
        <p className="sub-heading !max-w-3xl">
          Find the perfect home, apartment, or land with ease. Explore a wide
          range of properties for sale or rent, and make your next move a
          breeze.
        </p>
        <SearchForm />
      </section>

      {/* Properties List Section */}
      <section className="section_container">
        <PropertiesList />
      </section>
    </>
  );
}

export default page;
