import Form from "next/form";
import SearchFormReset from "@/components/SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ location, minPrice, maxPrice, status }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
    >
      <input
        name="location"
        defaultValue={location}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Location"
      />
      <input
        type="number"
        name="minPrice"
        defaultValue={minPrice}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Min Price"
      />
      <input
        type="number"
        name="maxPrice"
        defaultValue={maxPrice}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Max Price"
      />
      <select
        name="status"
        defaultValue={status}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="sold">Sold</option>
        <option value="reserved">Reserved</option>
      </select>
      <div className="flex items-center gap-2">
        {(location || minPrice || maxPrice || status) && <SearchFormReset />}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
