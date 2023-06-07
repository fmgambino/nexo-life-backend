import mongoose from "mongoose";
const { Schema } = mongoose;


const OtherInputSchema = new Schema({
  name: {
    type: String,
    required: [true, 'It is required to indicate the name of the input'],
  },
  value: {
    type: String || Number,
    required: [true, 'It is required to indicate the value of the input'],
  },

},
{
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }, 
  }
);
const InputSelectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'It is required to indicate the name of the input'],
  },
  value: {
    type: [String || Number],
    required: [true, 'It is required to indicate the value of the input'],
  },

},
{
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }, 
  }
);

const InfocollectorSchema = new Schema(
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
    prayer_request: {
      type: String,
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
    },
    to_be_visited: {
      type: Boolean,
      default: true,
    },
    line: {
      type: String,
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
        "EVANGELIZAR",
        "POR_DEFINIR",
        "DE_BAJA",
      ],
      default: "POR_DEFINIR",
    },
    invited_by: {
      type: String,
      required: true,
      trim: true,
    },
    coordinador: {
      type: String,
      trim: true,
    },
    double: {
      type: String,
      trim: true,
    },
    dataGral: {
      type: String,
    },
    otherInputs: {
      type :[OtherInputSchema],
      default: []
   },
    inputSelect: {
      type :[InputSelectSchema],
    default: []
   }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }, 
  }
);

export default mongoose.model("Infocollector", InfocollectorSchema);
