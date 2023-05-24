import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  body: {
    type: String,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  evangelized: {
    type: Schema.Types.ObjectId,
    ref: "Evangelize",
  },
  status: {
    type: String,
    enum: [
      "VISITADO",
      "CONTACTO_TELEFONICO",
      "NO_INFORMO",
      "NO_CONSOLIDO",
      "NO_RECIBIO",
    ],
    default: "NO_INFORMÓ",
  },
}, { timestamps: true });

export default mongoose.model("Comment", CommentSchema);
