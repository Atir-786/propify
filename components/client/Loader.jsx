"use client";

const Loader = ({ loading }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <h1 className="text-sm">{loading}</h1>
    </div>
  );
};
export default Loader;
