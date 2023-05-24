import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentStatusSchema = new Schema({
  status: {
    type: String,
  },
  color: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model("CommentStatus", CommentStatusSchema);
