import mongoose from "mongoose";

const dbConnect = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      process.env.MONGODB_URI, {
        user: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        }
      }
    );
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("Database error!");
  }
};

export default dbConnect;
