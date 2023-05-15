import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true,
    },
    consolidation: {
      type: Schema.Types.ObjectId,
      ref: "Consolidation",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
