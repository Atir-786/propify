import mongoose from "mongoose";
const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Property title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Property description is required"],
  },

  price: {
    type: Number,
    required: [true, "Property price is required"],
  },
  propertyType: {
    type: String,
    required: [true, "Property Type is required"],
  },
  address: {
    type: String,
    required: [true, "Property address is required"],
  },
  city: {
    type: String,
    required: [true, "Property city is required"],
  },
  state: {
    type: String,
    required: [true, "Property state is required"],
  },
  zip: {
    type: String,
    required: [true, "Property zipcode is required"],
  },
  country: {
    type: String,
    required: [true, "Property country is required"],
  },
  lat: {
    type: String,
    required: [true, "Property lat is required"],
  },
  lng: {
    type: String,
    required: [true, "Property lng is required"],
  },
  name: {
    type: String,
    required: [true, "Property Owner name is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  images: {
    type: [String],
    required: [true, "Property image is required"],
  },
});
export const Property =
  mongoose.models?.Property || mongoose.model("Property", propertySchema);
