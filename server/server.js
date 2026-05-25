import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(
    cors({
        origin: CLIENT_ORIGIN,
    })
);

app.use(express.json());

app.get("/api/health", (request, response) => {
    response.status(200).json({
        status: "success",
        message: "Portfolio API is running.",
    });
});

app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
    console.log(`Portfolio API running on port ${PORT}`);
});