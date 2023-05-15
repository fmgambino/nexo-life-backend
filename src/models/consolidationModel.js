import mongoose from "mongoose";
const { Schema } = mongoose;

const consolidationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      trim: true,
    },
    family_status: {
      type: String,
      enum: ["CASADO", "SOLTERO", "DIVORCIADO", "VIUDO", "CONCUBINATO"],
      default: "SOLTERO",
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    occupation: {
      type: String,
      trim: true,
    },
    another_church: {
      type: Boolean,
      default: false,
      required: true,
    },
    to_be_visited: {
      type: Boolean,
      default: true,
      required: true,
    },
    responsible: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    comments: [
      {
        body: String,
        created: Date,
        created_by: Schema.Types.ObjectId,
        status: {
          type: String,
          enum: [
            "VISITADO",
            "CONTACTO_TELEFONICO",
            "NO_INFORMO",
            "NO_CONSOLIDO",
            "NO_RECIBIO",
          ],
          default: "NO_INFORMO",
        },
      },
    ],
    // weeks: [
    //   {
    //     created: Date,
    //     created_by: Schema.Types.ObjectId,
    //     status: {
    //       type: String,
    //       enum: [
    //         "VISITADO",
    //         "CONTACTO_TELEFÓNICO",
    //         "NO_INFORMÓ",
    //         "NO_CONSOLIDÓ",
    //         "NO_RECIBIÓ",
    //       ],
    //       default: "NO_INFORMÓ",
    //     },
    //   },
    // ],
    //date: { type: Date, default: Date.now },
    // weeks: [
    //   {
    //     status: {
    //       type: String,
    //       enum: ["AUCENSIA", "JUSTIFICADO", "ASISTE", "SIN_DATOS"],
    //       default: "SIN_DATOS",
    //     },
    //     created: Date,
    //     created_by: Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

consolidationSchema.virtual("numOfComments").get(function () {
  return this.comments.length;
});

// consolidationSchema.virtual("respon", {
//   ref: "User",
//   localField: "responsible",
//   foreignField: "_id",
// });
// consolidationSchema.virtual("comments", {
//   ref: "Comment",
//   localField: "_id",
//   foreignField: "consolidation",
// });

// consolidationSchema.virtual("num_of_comments", {
//   ref: "Comment",
//   localField: "_id",
//   foreignField: "consolidation",
//   count: true,
// });

export default mongoose.model("Consolidation", consolidationSchema);
