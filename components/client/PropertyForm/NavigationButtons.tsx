import React from "react";
import { Button } from "../../ui/button";

const NavigationButtons = ({ step, prevStep, nextStep, handleSubmit }) => {
  return (
    <div className="flex justify-between mt-6">
      {step > 1 && (
        <Button
          type="button"
          onClick={prevStep}
          // className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Back
        </Button>
      )}
      {step < 6 && (
        <Button
          type="button"
          onClick={handleSubmit(nextStep)}
          // className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Next
        </Button>
      )}
      {step === 6 && (
        <Button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
