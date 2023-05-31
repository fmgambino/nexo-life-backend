import mongoose from "mongoose";
const { Schema } = mongoose;

const WeekSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Discipleship',
    required: [true, 'ID is required'],

  },
  year: {
    type: Number,
    required: [true, 'year is required'],

  },
  month: {
    type: String,
    required: [true, 'moth is required'],
  },
  weeks: {
    type :[{
    weekNumber: Number,
    status: String
    },
  ],
  default: []
 }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }, 
  }
);

export default mongoose.model("WeekSchema", WeekSchema);
