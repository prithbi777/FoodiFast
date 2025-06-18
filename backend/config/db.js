import mongoose from "mongoose";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit with failure
    }
};
