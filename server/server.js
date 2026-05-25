import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

connectDB();

const app = express();

// Load environment variables for server configuration, including port and client origin for CORS.
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(
    cors({
        origin: CLIENT_ORIGIN,
    })
);

app.use(express.json());

// Health check endpoint to verify the server is running and responsive.
app.get("/api/health", (request, response) => {
    response.status(200).json({
        status: "success",
        message: "Portfolio API is running.",
    });
});

// Connects contact form routes to backend API endpoint.
app.use("/api/contact", contactRoutes);

// Starts the server and listens on the specified port, logging a message to confirm it's running.
app.listen(PORT, () => {
    console.log(`Portfolio API running on port ${PORT}`);
});