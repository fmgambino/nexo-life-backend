import mongoose from "mongoose";

const { Schema } = mongoose;

const DestinationSchema = new Schema({
  destination: {
    type: String,
  },
  color: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model("Destination", DestinationSchema);
