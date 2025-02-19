export default async function Loading() {
  return (
    <div className="p-6 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
      <div className="h-64 bg-gray-300 rounded mt-6"></div>
    </div>
  );
}
