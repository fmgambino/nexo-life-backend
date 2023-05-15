import "dotenv/config";
import mongoose from "mongoose";
import userModel from "./src/models/userModel.js";
import churchModel from "./src/models/churchModel.js";

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("conected!");
  })
  .catch((err) => {
    console.log(err);
  });

const seedDB = async () => {
  await userModel.deleteMany({});
  await churchModel.deleteMany({});

  const newChurch = new churchModel({
    name: "Alfa y Omega",
    address: "123 Main St",
  });

  const newUser = new userModel({
    name: "SuperAdministrator",
    email: "admin@nexo-house.com",
    password: "12345678",
    profile: "Administrator",
    rol: "SuperAdministrator",
    address: "Calle # 12",
    phone: "+532837452",
  });

  await newChurch.save();
  await newUser.save();
};

seedDB().then(() => {
  mongoose.connection.close();
});
