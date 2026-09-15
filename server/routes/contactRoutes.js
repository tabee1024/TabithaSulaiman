import express from "express";
import rateLimit from "express-rate-limit";

import { createContactMessage } from "../controllers/contactController.js";

const router = express.Router();


// Limits repeated contact-form submissions from one IP address.
// A visitor can submit at most 5 messages every 15 minutes.

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,

    message: {
        status: "error",
        message:
            "Too many messages have been submitted. Please wait a few minutes and try again.",
    },
});


router.post(
    "/",
    contactLimiter,
    createContactMessage
);


export default router;