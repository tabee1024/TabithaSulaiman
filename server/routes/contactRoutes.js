import express from "express";

// Each POST request runs contactController's createContactMessage function.
import { createContactMessage } from "../controllers/contactController.js";

const router = express.Router();

// Connects route to controller function.
router.post("/", createContactMessage);

export default router;