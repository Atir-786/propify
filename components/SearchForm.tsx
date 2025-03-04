// import { redirect } from "next/navigation";

// const SearchForm = ({ searchParams }) => {
//   const handleSearch = async (formData) => {
//     "use server"; // Enables server actions

//     const location = formData.get("location");
//     const minPrice = formData.get("minPrice");
//     const maxPrice = formData.get("maxPrice");

//     const query = new URLSearchParams();
//     if (location) query.append("location", location);
//     if (minPrice) query.append("minPrice", minPrice);
//     if (maxPrice) query.append("maxPrice", maxPrice);

//     redirect(`/?${query.toString()}`);
//   };

//   return (
//     <form
//       action={handleSearch}
//       className="flex flex-wrap gap-4 p-4 bg-white shadow-md rounded-lg"
//     >
//       <input
//         type="text"
//         name="location"
//         placeholder="Enter location"
//         defaultValue={searchParams?.location || ""}
//         className="border p-2 rounded w-full sm:w-auto"
//       />
//       <input
//         type="number"
//         name="minPrice"
//         placeholder="Min Price"
//         defaultValue={searchParams?.minPrice || ""}
//         className="border p-2 rounded w-full sm:w-auto"
//       />
//       <input
//         type="number"
//         name="maxPrice"
//         placeholder="Max Price"
//         defaultValue={searchParams?.maxPrice || ""}
//         className="border p-2 rounded w-full sm:w-auto"
//       />
//       <button
//         type="submit"
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Search
//       </button>
//     </form>
//   );
// };

// export default SearchForm;
