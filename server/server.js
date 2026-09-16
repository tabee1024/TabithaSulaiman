import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminProjectRoutes from "./routes/adminProjectRoutes.js";


dotenv.config();


connectDB();


const app = express();


app.set("trust proxy", 1);


const PORT =
    process.env.PORT || 5000;

const CLIENT_ORIGIN =
    process.env.CLIENT_ORIGIN ||
    "http://localhost:5173";


// =====================================================
// CORS
// =====================================================

app.use(
    cors({
        origin: CLIENT_ORIGIN,
        credentials: true,
    })
);


// =====================================================
// COOKIES
// =====================================================
//
// Admin authentication uses an HTTP-only cookie,
// so cookies must be parsed before protected routes.
// =====================================================

app.use(cookieParser());


// =====================================================
// HEALTH CHECK
// =====================================================

app.get(
    "/api/health",
    (request, response) => {
        return response.status(200).json({
            status: "success",
            message:
                "Portfolio API is running.",
        });
    }
);


// =====================================================
// PUBLIC CONTACT API
// =====================================================
//
// Contact submissions remain intentionally small.
// =====================================================

app.use(
    "/api/contact",
    express.json({
        limit: "10kb",
    }),
    contactRoutes
);


// =====================================================
// VERSION 4 PROJECT CMS
// =====================================================
//
// Structured case-study drafts can legitimately
// contain more text than a contact submission.
//
// Binary image/video data will NOT be uploaded
// through this JSON body.
// =====================================================

app.use(
    "/api/admin/projects",
    express.json({
        limit: "64kb",
    }),
    adminProjectRoutes
);


// =====================================================
// EXISTING ADMIN API
// =====================================================
//
// Login and contact-message administration stay
// under the smaller request-body limit.
// =====================================================

app.use(
    "/api/admin",
    express.json({
        limit: "10kb",
    }),
    adminRoutes
);


// =====================================================
// START SERVER
// =====================================================

app.listen(
    PORT,
    () => {
        console.log(
            `Portfolio API running on port ${PORT}`
        );
    }
);