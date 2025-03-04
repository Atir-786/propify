const { FaAlignLeft, FaListAlt } = require("react-icons/fa");

const PropertyDescription = ({ description, features }) => (
  <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-3">
      <FaAlignLeft className="text-green-500" /> Property Description
    </h3>
    <p className="text-gray-600">{description || "No description provided."}</p>
    {features && (
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-3">
          <FaListAlt className="text-blue-500" /> Features
        </h3>
        <p className="text-gray-600">{features}</p>
      </div>
    )}
  </div>
);
export default PropertyDescription;
