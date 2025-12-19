import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  userId: String,
  personalityId: String,
  sender: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
