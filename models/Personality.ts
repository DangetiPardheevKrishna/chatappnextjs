import mongoose from "mongoose";

const PersonalitySchema = new mongoose.Schema({
  personalityId: { type: String, required: true },
  userId: { type: String, required: true },
  name: String,
  description: String,
  systemPrompt: String,
  avatar: String,
  isDefault: { type: Boolean, default: false },
});

export default mongoose.models.Personality ||
  mongoose.model("Personality", PersonalitySchema);
