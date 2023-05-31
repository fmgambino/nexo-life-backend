import mongoose from "mongoose";
const { Schema } = mongoose;

const LeaderSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    coordinator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'Coordinator is required'],
    },
    discipler: {
      type: String,
      required: [true, 'discipler is required'],
      trim: true,
    },
    
    dd: {
      type: Number,
      default: 0,
    },
    dr: {
      type: Number,
      default: 0,
    },
    attendance: {
      type: Number,
      default: 0,
    },
    serviceArea: {
      type: String,
      required: [true, 'service area is required'],   
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    cellAddress: {
      type: String,
      default: false,
      required: [true, 'cell address is required'],
    }    
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }, 
  }
);

LeaderSchema.index({ name: 1, coordinator: 1, discipler: 1 }, { unique: true });

export default mongoose.model("Leader", LeaderSchema);
