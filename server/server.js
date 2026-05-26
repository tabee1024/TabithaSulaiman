import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// Allows cookies to be included in CORs requests from frontend, which means server will accept requests from the specified origin and allow credentials (like cookies) to be sent with those requests.
app.use(
    cors({
        origin: CLIENT_ORIGIN,
        credentials: true,
    })
);

app.use(express.json());

// Lets backend read cookies from incoming requests, which is necessary for admin authentication to work since the admin token is stored in a cookie.
app.use(cookieParser());

// Health check endpoint to verify the server is running and responsive.
app.get("/api/health", (request, response) => {
    response.status(200).json({
        status: "success",
        message: "Portfolio API is running.",
    });
});

// Connects contact form routes to backend API endpoint.
app.use("/api/contact", contactRoutes);

// Connects admin authentication and protected routes to backend API endpoint.
app.use("/api/admin", adminRoutes);

// Starts the server and listens on the specified port, logging a message to confirm it's running.
app.listen(PORT, () => {
    console.log(`Portfolio API running on port ${PORT}`);
});