import mongoose from "mongoose";
const { Schema } = mongoose;

const weekSchema = new Schema(
  {
    week: {
      type: Number,
      required: true,
      trim: true,
    },
    consolidation: {
      type: Schema.Types.ObjectId,
      ref: "Consolidation",
    },
    type: {
      type: String,
      enum: ["Assisted", "Did not assist", "Justified", "Without reason"],
      default: "Assisted",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Week", weekSchema);
