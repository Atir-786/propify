import React from "react";

const ProgressBar = ({ step }) => {
  return (
    <div className="flex items-center mb-6">
      {[1, 2, 3, 4, 5,6].map((s) => (
        <div
          key={s}
          className={`flex-1 h-2 rounded-lg ${
            s <= step ? "bg-green-500" : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
