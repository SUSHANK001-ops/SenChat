import mongoose from "mongoose";
import dotenv from "dotenv";
import { ENV } from "./env.js";
dotenv.config();
const ConnectDB = async () => {
  try {
    const { MONGO_URI } = ENV;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is missing!!!!");
    }
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("Database Connected succesfully", conn.connection.host);
  } catch (error) {
    console.error("Error connection to DATABASE", error);
    process.exit(1); //1 status means fail , 0 means success
  }
};

export default ConnectDB;
