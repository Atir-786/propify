"use client";
import { useState } from "react";

const TabsWrapper = ({ children }) => {
  const [activeTab, setActiveTab] = useState("description");

  const renderTabContent = () => {
    return children.find((child) => child.key === activeTab);
  };

  return (
    <div>
      {/* Tab Navigation */}
      <ul className="border-b grid grid-cols-3 md:grid-cols-5">
        {[
          { key: "description", label: "Description" },
          { key: "location", label: "Location" },
          { key: "aiprice", label: "AI Price" },
          { key: "nearby places", label: "Nearby Places" },
          { key: "virtual tour", label: "Virtual Tour" },
        ].map(({ key, label }) => (
          <li key={key} className="mr-2">
            <button
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === key
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Render Selected Tab Content */}
      <div className="mt-4">{renderTabContent()}</div>
    </div>
  );
};

export default TabsWrapper;
