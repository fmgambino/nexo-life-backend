import mongoose from "mongoose";
import  destinations  from '../controllers/destinationController.js';
import  commentStatus  from '../controllers/commetStatusController.js';
const dbConnect = async ()  => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      process.env.MONGODB_URI
    );
    console.log("Database connected successfully!");
    await destinations.createDefaultDestinations();
    await commentStatus.createDefaultCommentStatus();
  } catch (error) {
    console.log("Database error!" + error);
  }
};

export default dbConnect;
