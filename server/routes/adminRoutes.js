import express from "express";
import {
    getAdminMessages,
    loginAdmin,
    logoutAdmin,
} from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/messages", requireAdmin, getAdminMessages);
router.post("/logout", logoutAdmin);

export default router;