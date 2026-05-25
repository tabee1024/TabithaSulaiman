import mongoose from "mongoose";

async function connectDB() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from environment variables.");
        }

        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;