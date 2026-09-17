import mongoose from "mongoose";

import Project from "../models/Project.js";


const EDITABLE_DRAFT_FIELDS = [
    "title",
    "subtitle",
    "type",
    "displayType",
    "status",
    "featured",
    "role",
    "audience",
    "location",
    "date",
    "sortDate",
    "order",
    "summary",
    "shortValue",
    "problem",
    "solution",
    "impact",
    "cardOutcome",
    "thinkingLenses",
    "roleLens",
    "proofPoints",
    "impactStats",
    "tools",
    "skills",
    "cardTags",
    "searchableTags",
    "detailCta",
    "lensEvidence",
    "filterFacets",
    "caseStudy",
    "media",
    "links",
];


function getAllowedDraftFields(source) {
    if (
        !source ||
        typeof source !== "object" ||
        Array.isArray(source)
    ) {
        return {};
    }

    const allowedFields = {};

    for (const field of EDITABLE_DRAFT_FIELDS) {
        if (
            Object.prototype.hasOwnProperty.call(
                source,
                field
            )
        ) {
            allowedFields[field] = source[field];
        }
    }

    return allowedFields;
}


function isValidProjectId(projectId) {
    return mongoose.isValidObjectId(projectId);
}


function sendProjectError(error, response) {
    // MongoDB duplicate-key error.
    if (error?.code === 11000) {
        return response.status(409).json({
            status: "error",
            message:
                "A project with that slug already exists.",
        });
    }


    // Mongoose validation failure.
    if (error?.name === "ValidationError") {
        const errors = Object.values(
            error.errors
        ).map((validationError) => {
            return validationError.message;
        });

        return response.status(400).json({
            status: "error",
            message:
                "Some project fields are invalid.",
            errors,
        });
    }


    // Detailed errors stay on the server.
    console.error("Project CMS error:", error);


    // Browser gets a privacy-safe response.
    return response.status(500).json({
        status: "error",
        message:
            "Unable to complete the project request.",
    });
}


// =====================================================
// GET ALL PROJECTS FOR ADMIN
// GET /api/admin/projects
// =====================================================

export async function getAdminProjects(
    request,
    response
) {
    try {
        const includeArchived =
            request.query.includeArchived === "true";


        const filter = includeArchived
            ? {}
            : {
                isArchived: false,
            };


        const projects = await Project.find(filter)
            .sort({
                "draft.order": 1,
                updatedAt: -1,
            })
            .select(
                [
                    "slug",
                    "draft.title",
                    "draft.subtitle",
                    "draft.status",
                    "draft.featured",
                    "draft.displayType",
                    "draft.sortDate",
                    "publicationStatus",
                    "publishedAt",
                    "revision",
                    "isArchived",
                    "createdAt",
                    "updatedAt",
                ].join(" ")
            )
            .lean();


        return response.status(200).json({
            status: "success",
            data: projects,
        });
    } catch (error) {
        return sendProjectError(
            error,
            response
        );
    }
}


// =====================================================
// GET ONE PROJECT FOR ADMIN
// GET /api/admin/projects/:projectId
// =====================================================

export async function getAdminProject(
    request,
    response
) {
    try {
        const { projectId } = request.params;


        if (!isValidProjectId(projectId)) {
            return response.status(400).json({
                status: "error",
                message: "Invalid project ID.",
            });
        }


        const project =
            await Project.findById(projectId)
                .select("-__v")
                .lean();


        if (!project) {
            return response.status(404).json({
                status: "error",
                message: "Project not found.",
            });
        }


        return response.status(200).json({
            status: "success",
            data: project,
        });
    } catch (error) {
        return sendProjectError(
            error,
            response
        );
    }
}


// =====================================================
// CREATE PROJECT
// POST /api/admin/projects
//
// Always creates a DRAFT.
// It cannot publish anything.
// =====================================================

export async function createAdminProject(
    request,
    response
) {
    try {
        const { slug, draft } =
            request.body;


        if (
            typeof slug !== "string" ||
            !slug.trim()
        ) {
            return response.status(400).json({
                status: "error",
                message:
                    "Project slug is required.",
            });
        }


        if (
            !draft ||
            typeof draft !== "object" ||
            Array.isArray(draft)
        ) {
            return response.status(400).json({
                status: "error",
                message:
                    "Project draft data is required.",
            });
        }


        const safeDraft =
            getAllowedDraftFields(draft);


        if (
            typeof safeDraft.title !==
            "string" ||
            !safeDraft.title.trim()
        ) {
            return response.status(400).json({
                status: "error",
                message:
                    "Project title is required.",
            });
        }


        const project = await Project.create({
            slug: slug
                .trim()
                .toLowerCase(),

            draft: safeDraft,

            publicationStatus: "draft",

            isArchived: false,

            revision: 0,
        });


        return response.status(201).json({
            status: "success",
            message:
                "Project draft created.",
            data: project,
        });
    } catch (error) {
        return sendProjectError(
            error,
            response
        );
    }
}


// =====================================================
// SAVE DRAFT
// PATCH /api/admin/projects/:projectId
//
// IMPORTANT:
// This endpoint can change:
// - slug
// - draft fields
//
// It cannot directly change:
// - published
// - publicationStatus
// - publishedAt
// - revision
// - isArchived
// - _id
// =====================================================

export async function updateAdminProjectDraft(
    request,
    response
) {
    try {
        const { projectId } =
            request.params;


        if (!isValidProjectId(projectId)) {
            return response.status(400).json({
                status: "error",
                message: "Invalid project ID.",
            });
        }


        const project =
            await Project.findById(projectId);


        if (!project) {
            return response.status(404).json({
                status: "error",
                message: "Project not found.",
            });
        }


        if (project.isArchived) {
            return response.status(409).json({
                status: "error",
                message:
                    "Archived projects must be restored before they can be edited.",
            });
        }


        const suppliedDraft =
            request.body?.draft;


        if (
            suppliedDraft !== undefined &&
            (
                typeof suppliedDraft !==
                "object" ||
                suppliedDraft === null ||
                Array.isArray(suppliedDraft)
            )
        ) {
            return response.status(400).json({
                status: "error",
                message:
                    "Project draft must be an object.",
            });
        }


        const source =
            suppliedDraft ?? request.body;


        const safeDraftFields =
            getAllowedDraftFields(source);


        const hasSlug =
            Object.prototype.hasOwnProperty.call(
                request.body,
                "slug"
            );


        if (
            Object.keys(
                safeDraftFields
            ).length === 0 &&
            !hasSlug
        ) {
            return response.status(400).json({
                status: "error",
                message:
                    "No editable project fields were provided.",
            });
        }


        if (hasSlug) {
            if (
                typeof request.body.slug !==
                "string" ||
                !request.body.slug.trim()
            ) {
                return response.status(400).json({
                    status: "error",
                    message:
                        "Project slug cannot be empty.",
                });
            }


            project.slug =
                request.body.slug
                    .trim()
                    .toLowerCase();
        }


        // Apply only fields from our explicit allowlist.
        //
        // Fields such as published,
        // publicationStatus, revision, _id,
        // and isArchived never reach this block.
        for (
            const [
                field,
                value,
            ] of Object.entries(
                safeDraftFields
            )
        ) {
            project.draft.set(
                field,
                value
            );
        }


        await project.save();


        return response.status(200).json({
            status: "success",
            message:
                "Project draft saved.",
            data: project,
        });
    } catch (error) {
        return sendProjectError(
            error,
            response
        );
    }
}


// =====================================================
// PUBLISH
// POST /api/admin/projects/:projectId/publish
//
// Copies the validated draft into a separate
// published snapshot.
//
// Save Draft does NOT change public content.
// =====================================================

export async function publishAdminProject(
    request,
    response
) {
    try {
        const { projectId } =
            request.params;


        if (!isValidProjectId(projectId)) {
            return response.status(400).json({
                status: "error",
                message: "Invalid project ID.",
            });
        }


        const project =
            await Project.findById(projectId);


        if (!project) {
            return response.status(404).json({
                status: "error",
                message: "Project not found.",
            });
        }


        if (project.isArchived) {
            return response.status(409).json({
                status: "error",
                message:
                    "Archived projects cannot be published.",
            });
        }


        const publishedSnapshot =
            project.draft.toObject({
                depopulate: true,
                versionKey: false,
            });


        project.published =
            publishedSnapshot;

        project.publicationStatus =
            "published";

        project.publishedAt =
            new Date();

        project.revision += 1;


        // save() runs Mongoose validation before
        // writing anything to MongoDB.
        await project.save();


        return response.status(200).json({
            status: "success",
            message:
                "Project published.",
            data: {
                id: project._id,
                slug: project.slug,
                publicationStatus:
                    project.publicationStatus,
                publishedAt:
                    project.publishedAt,
                revision:
                    project.revision,
            },
        });
    } catch (error) {
        return sendProjectError(
            error,
            response
        );
    }
}


// =====================================================
// UNPUBLISH
// POST /api/admin/projects/:projectId/unpublish
//
// Published snapshot is retained for history,
// but public APIs will later only return records
// whose publicationStatus === "published".
// =====================================================

export async function unpublishAdminProject(
    request,
    response
) {
    try {
        const { projectId } =
            request.params;


        if (!isValidProjectId(projectId)) {
            return response.status(400).json({
                status: "error",
                message: "Invalid project ID.",
            });
        }


        const project =
            await Project.findById(projectId);


        if (!project) {
            return response.status(404).json({
                status: "error",
                message: "Project not found.",
            });
        }


        project.publicationStatus =
            "draft";


        await project.save();


        return response.status(200).json({
            status: "success",
            message:
                "Project unpublished.",
            data: {
                id: project._id,
                slug: project.slug,
                publicationStatus:
                    project.publicationStatus,
            },
        });
    } catch (error) {
        return sendProjectError(
            error,
            response
        );
    }
}


// =====================================================
// ARCHIVE
// POST /api/admin/projects/:projectId/archive
//
// We deliberately do NOT permanently delete
// portfolio content in CMS v1.
// =====================================================

export async function archiveAdminProject(
    request,
    response
) {
    try {
        const { projectId } =
            request.params;


        if (!isValidProjectId(projectId)) {
            return response.status(400).json({
                status: "error",
                message: "Invalid project ID.",
            });
        }


        const project =
            await Project.findById(projectId);


        if (!project) {
            return response.status(404).json({
                status: "error",
                message: "Project not found.",
            });
        }


        project.isArchived = true;

        // Archived content cannot remain
        // publicly published.
        project.publicationStatus =
            "draft";


        await project.save();


        return response.status(200).json({
            status: "success",
            message:
                "Project archived.",
        });
    } catch (error) {
        return sendProjectError(
            error,
            response
        );
    }
}


// =====================================================
// RESTORE
// POST /api/admin/projects/:projectId/restore
//
// Restoring does NOT automatically republish.
// =====================================================

export async function restoreAdminProject(
    request,
    response
) {
    try {
        const { projectId } =
            request.params;


        if (!isValidProjectId(projectId)) {
            return response.status(400).json({
                status: "error",
                message: "Invalid project ID.",
            });
        }


        const project =
            await Project.findById(projectId);


        if (!project) {
            return response.status(404).json({
                status: "error",
                message: "Project not found.",
            });
        }


        project.isArchived = false;


        await project.save();


        return response.status(200).json({
            status: "success",
            message:
                "Project restored.",
        });
    } catch (error) {
        return sendProjectError(
            error,
            response
        );
    }
}