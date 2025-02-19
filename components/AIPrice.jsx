import connectDB from "@/lib/db";
import { Property } from "@/models/Property";
import React from "react";

const AIPrice = async ({ id }) => {
  let price = 0;
  await connectDB();
  try {
    console.log("finding");
    const property = await Property.findById(id);
    console.log(property);
    const {
      bedrooms,
      bathrooms,
      livingArea,
      floors,
      totalHouseArea,
      builtYear,
      lotArea,
      houseGrade,
      waterfront = 0,
    } = property;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("bedrooms", bedrooms);
    urlencoded.append("bathrooms", bathrooms);
    urlencoded.append("livingarea", livingArea);
    urlencoded.append("floors", floors);
    urlencoded.append("arhouse", totalHouseArea);
    urlencoded.append("builtyr", builtYear);
    urlencoded.append("lotarea", lotArea);
    urlencoded.append("grade", houseGrade);
    urlencoded.append("waterfront", "0");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const res = await fetch(
      "https://priceprediction-zdv5.onrender.com/predict",
      requestOptions
    );
    const data = await res.json();
    console.log(data);
    price = data.prediction;
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-red-500">
        ${price.toLocaleString()}
      </h1>
    </div>
  );
};

export default AIPrice;
