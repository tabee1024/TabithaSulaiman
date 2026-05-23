import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

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

app.post("/api/contact", (request, response) => {
    const { name, email, title, company, reason, message } = request.body;

    if (!name || !email || !message) {
        return response.status(400).json({
            status: "error",
            message: "Name, email, and message are required.",
        });
    }

    return response.status(200).json({
        status: "success",
        message: "Contact message received. Database connection comes next.",
        data: {
            name,
            email,
            title,
            company,
            reason,
            message,
        },
    });
});

app.listen(PORT, () => {
    console.log(`Portfolio API running on port ${PORT}`);
});