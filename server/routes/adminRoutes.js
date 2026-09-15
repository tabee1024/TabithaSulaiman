import express from "express";
import rateLimit from "express-rate-limit";

import {
    getAdminMessages,
    loginAdmin,
    logoutAdmin,
    updateAdminMessage,
} from "../controllers/adminController.js";

import { requireAdmin } from "../middleware/authMiddleware.js";


const router = express.Router();


// Protects the admin login endpoint from repeated
// password-guessing attempts.

const adminLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        status: "error",
        message:
            "Too many login attempts. Please wait a few minutes and try again.",
    },
});


router.post(
    "/login",
    adminLoginLimiter,
    loginAdmin
);


router.get(
    "/messages",
    requireAdmin,
    getAdminMessages
);


router.patch(
    "/messages/:messageId",
    requireAdmin,
    updateAdminMessage
);


router.post(
    "/logout",
    requireAdmin,
    logoutAdmin
);


export default router;