"use client";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import Loader from "../Loader";
import { addProperty } from "@/action/property";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { addImagesToSupabase } from "@/action/supabase";
import LocationDetails from "./LocationDetails";
import ContactDetails from "./ContactDetails";
import ImageDetails from "./ImageDetails";
import PropertyDetails from "./PropertyDetails";
import MapDetails from "./MapDetails";
import ProgressBar from "./ProgressBar";
import NavigationButtons from "./NavigationButtons";

const MultiStepForm = () => {
  const [step, setStep] = useState(1); // Current step
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const router = useRouter();
  // Move to Next Step
  const nextStep = async (data: FieldValues) => {
    console.log("next clicked");
    if (step == 2) {
      setIsLoading(true);
      const fullAddress = `${data.address},${data.city},${data.state},${data.zip},${data.country}`;
      console.log(fullAddress);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            fullAddress
          )}&format=json`
        );
        const result = await res.json();
        console.log(result);
        if (result.length > 0) {
          const { lat, lon } = result[0];
          console.log(lat, lon);
          setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) });
        } else {
          alert("address not found");
          setIsLoading(false);

          // setStep(step);
          return;
        }
      } catch (error) {
        console.error("Geocoding error:", error);
        alert("Failed to fetch coordinates. Try again!");
        setIsLoading(false);

        return;
      }
    }
    setIsLoading(false);
    setFormData({ ...formData, ...data });

    console.log(data);
    setStep((prevStep) => prevStep + 1);
  };

  // Move to Previous Step
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldUnregister: false });

  // Submit the Form
  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    // upload to the supabase
    setIsLoading(true);
    const uploadedImages = await addImagesToSupabase(data.images);

    console.log(uploadedImages);
    const finalData = { ...formData, images: uploadedImages };
    console.log(finalData);
    // Add property to supabase
    const error = await addProperty(finalData);
    if (!error) {
      toast.success("Registered Successfully");
      setIsLoading(false);
      router.replace("/");
    } else {
      console.log(error);
      toast.error(error);
    }

    // console.log(finalData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-white">
      {/* Progress Bar */}
      <ProgressBar step={step} />
      {/* Form Steps */}
      <form onSubmit={handleSubmit(step === 5 ? onSubmit : nextStep)}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {step === 1 && (
              <PropertyDetails
                register={register}
                errors={errors}
                control={control}
              />
            )}
            {step === 2 && <LocationDetails register={register} />}
            {step === 3 && (
              <MapDetails
                register={register}
                coordinates={coordinates}
                setCoordinates={setCoordinates}
              />
            )}
            {step === 4 && <ContactDetails register={register} />}
            {step === 5 && <ImageDetails register={register} errors={errors} />}
            {/* Navigation Buttons */}
            <NavigationButtons
              step={step}
              nextStep={nextStep}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
            />
          </>
        )}
      </form>
    </div>
  );
};
export default MultiStepForm;
