import mongoose from "mongoose";
const { Schema } = mongoose;

const WeekSchema = new Schema({
  presente: {
    type: String,
    required: [true, 'Attendance required'],
  },
  fecha: {
    type: Date,
    required: [true, 'Date is required'],
  },
  donaciones: {
    type: String,
    required: [true, 'Donations are required'],
  },
  observaciones: {
    type: String,
  }
},
{
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }, 
  }
);

const NetworkDiscipleSchema = new Schema({
  name: {
    type: String,
    required: [true, 'It is required to indicate the name of the network disciple'],
  },
  weeks: {
    type: [WeekSchema],
    default: [],
  },

},
{
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }, 
  }
);

const DirectDiscipleSchema = new Schema({
    leader: {
        type: Schema.Types.ObjectId,
        ref: "Leader",
        required: [true, 'Leader is required'],
    },
    age: {
        type: Number,
        required: [true, 'It is required to indicate the age of the direct disciple'],
    },
    name: {
        type: String,
        required: [true, 'It is required to indicate the name of the direct disciple'],
    },
    phone: {
        type: String,
        required: [true, 'It is required to indicate the telephone number of the direct disciple'],
    },
    retreat: {
        type: Boolean,
        required: [true, 'It is required to indicate if the direct disciple made a withdrawal'],
    },
    biblical_school: {
        type: Boolean,
        required: [true, 'It is required to indicate if the direct disciple attended a Bible school'],
    },
    observations: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    network_disciples: {
      type: [NetworkDiscipleSchema],
      default: [],
    },
},
{
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }, 
  }
);

export default mongoose.model("DirectDisciple", DirectDiscipleSchema);
