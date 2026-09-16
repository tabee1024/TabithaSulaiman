import express from "express";
import rateLimit from "express-rate-limit";

import {
    archiveAdminProject,
    createAdminProject,
    getAdminProject,
    getAdminProjects,
    publishAdminProject,
    restoreAdminProject,
    unpublishAdminProject,
    updateAdminProjectDraft,
} from "../controllers/adminProjectController.js";

import {
    requireAdmin,
} from "../middleware/authMiddleware.js";

import {
    requireTrustedAdminRequest,
} from "../middleware/adminRequestMiddleware.js";

const router = express.Router();


// ----------------------------------------
// CMS write protection
// ----------------------------------------

const adminProjectWriteLimiter =
    rateLimit({
        windowMs:
            15 * 60 * 1000,

        max: 60,

        standardHeaders: true,

        legacyHeaders: false,

        message: {
            status: "error",
            message:
                "Too many project changes were attempted. Please wait a few minutes and try again.",
        },
    });


// ----------------------------------------
// AUTHENTICATION WALL
// ----------------------------------------
//
// Every route declared below this line
// requires a valid admin JWT.
//
// This is intentionally router-wide so
// future CMS routes do not accidentally
// get added without requireAdmin.
// ----------------------------------------

router.use(requireAdmin);


// ----------------------------------------
// READ
// ----------------------------------------

router.get(
    "/",
    getAdminProjects
);


router.get(
    "/:projectId",
    getAdminProject
);


// ----------------------------------------
// CREATE
// ----------------------------------------

router.post(
    "/",
    requireTrustedAdminRequest,
    adminProjectWriteLimiter,
    createAdminProject
);


// ----------------------------------------
// SAVE DRAFT
// ----------------------------------------

router.patch(
    "/:projectId",
    requireTrustedAdminRequest,
    adminProjectWriteLimiter,
    updateAdminProjectDraft
);


// ----------------------------------------
// PUBLISH
// ----------------------------------------

router.post(
    "/:projectId/publish",
    requireTrustedAdminRequest,
    adminProjectWriteLimiter,
    publishAdminProject
);


// ----------------------------------------
// UNPUBLISH
// ----------------------------------------

router.post(
    "/:projectId/unpublish",
    requireTrustedAdminRequest,
    adminProjectWriteLimiter,
    unpublishAdminProject
);


// ----------------------------------------
// ARCHIVE
// ----------------------------------------

router.post(
    "/:projectId/archive",
    requireTrustedAdminRequest,
    adminProjectWriteLimiter,
    archiveAdminProject
);


// ----------------------------------------
// RESTORE
// ----------------------------------------

router.post(
    "/:projectId/restore",
    requireTrustedAdminRequest,
    adminProjectWriteLimiter,
    restoreAdminProject
);


export default router;