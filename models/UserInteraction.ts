// models/UserInteraction.js
import mongoose from "mongoose";

const UserInteractionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  propertyId: { type: String, required: true },
  viewCount: { type: Number, default: 1 },
  lastViewed: { type: Date, default: Date.now },
});

export default mongoose.models.UserInteraction ||
  mongoose.model("UserInteraction", UserInteractionSchema);
