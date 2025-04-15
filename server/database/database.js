import mongoose from "mongoose";
import { DB_URL } from "../config/env.js";

if (!DB_URL) {
    throw new Error("MongoDB URL is not defined");
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}
export default connectDB;