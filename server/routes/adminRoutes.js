import express from "express";
import {
    getAdminMessages,
    loginAdmin,
    logoutAdmin,
    updateAdminMessage,
} from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

// Admin Routes: Defines routes for admin authentication (login/logout) and protected routes for managing contact messages. The GET and PATCH routes for messages require admin authentication, ensuring that only logged-in admins can access or modify contact messages.
const router = express.Router();

router.post("/login", loginAdmin);
router.get("/messages", requireAdmin, getAdminMessages);
router.patch("/messages/:messageId", requireAdmin, updateAdminMessage);
router.post("/logout", logoutAdmin);

export default router;