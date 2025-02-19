import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: false },
  properties: { type: Array },
  authProviderId: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
