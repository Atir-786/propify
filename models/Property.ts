import mongoose from "mongoose";
const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Property title is required"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Property location is required"],
  },
  price: {
    type: Number,
    required: [true, "Property price is required"],
  },
  description: {
    type: String,
    required: [true, "Property description is required"],
  },
  // ownerId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
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
