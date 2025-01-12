import { config } from "@utils/config";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(config.mongoUri);
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
