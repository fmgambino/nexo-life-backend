import mongoose from "mongoose";
const { Schema } = mongoose;

const churchSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

churchSchema.pre("deleteOne", function (next) {
  this.model("Consolidation").remove({ church: this._id }, next);
  this.model("User").remove({ church: this._id }, next);
  next();
});

export default mongoose.model("Church", churchSchema, "churchs");
