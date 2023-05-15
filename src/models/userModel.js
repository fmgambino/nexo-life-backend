import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    profile: {
      type: String,
      enum: ["DataEntry", "Administrator"],
      default: "DataEntry",
      trim: true,
    },
    church: {
      type: Schema.Types.ObjectId,
      ref: "Church",
    },
    rol: {
      type: String,
      enum: ["SuperAdministrator", "Administrator", "Responsible"],
      default: "Responsible",
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      require: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  //console.log("create", this.password);
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 10);
  }
});

userSchema.methods.isPasswordMatch = async function (newPassword) {
  return await bcrypt.compare(newPassword, this.password);
};

export default mongoose.model("User", userSchema);
