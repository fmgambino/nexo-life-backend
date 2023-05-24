import mongoose from "mongoose";
const { Schema } = mongoose;

const evangelizeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    age: {
      type: Number,
      trim: true,
    },
    family_status: {
      type: String,
      enum: ["CASADO", "SOLTERO"],
      default: "SOLTERO",
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],   
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Locality is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    occupation: {
      type: String,
      trim: true,
    },
    another_church: {
      type: Boolean,
      default: false,
      required: [true, 'Field is required'],
    },
    to_be_visited: {
      type: Boolean,
      default: true,
      required: [true, 'Field is required'],
    },
    responsible: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'Responsible is required'],
      trim: true,
    },
    church: {
      type: Schema.Types.ObjectId,
      ref: "Church",
    },
    destination: {
      type: String,
      enum: [
        "CONSOLIDADO",
        "EN_ORACIÓN",
        "EN_PROCESO",
        "OTRA_IGLESIA",
        "VISITA",
      ],
      default: "EN_PROCESO",
    },
    invited_by: {
      type: String,
      required: true,
      trim: true,
    },
    consolidator: {
      type: String,
      required: true,
      trim: true,
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }, 
  }
);

evangelizeSchema.index({ name: 1, last_name: 1 }, { unique: true });

export default mongoose.model("Evangelize", evangelizeSchema);
