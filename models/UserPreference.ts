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

const UserPreference: mongoose.Model<any> =
  mongoose.models.UserPreference ||
  mongoose.model("UserPreference", UserPreferenceSchema);

export default UserPreference;
