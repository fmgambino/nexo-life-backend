import mongoose from "mongoose";

const dbConnect = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("Database error!");
  }
};

export default dbConnect;
