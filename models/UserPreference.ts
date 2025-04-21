// models/UserPreference.js
import mongoose from "mongoose";

const UserPreferenceSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  preferredLocation: String,
  preferredPriceRange: {
    min: Number,
    max: Number,
  },
  preferredStatus: String,
});

export default mongoose.models.UserPreference ||
  mongoose.model("UserPreference", UserPreferenceSchema);
