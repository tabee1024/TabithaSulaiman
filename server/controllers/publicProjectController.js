import Project from "../models/Project.js";


const SLUG_PATTERN =
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/;


const PUBLIC_LIST_FIELDS = [
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
    "media",
    "links",
];


function buildListProjection() {
    const projection = {
        _id: 0,
        slug: 1,
    };

    for (
        const field
        of PUBLIC_LIST_FIELDS
    ) {
        projection[
            `published.${field}`
        ] = 1;
    }

    return projection;
}


function normalizeSortDate(value) {
    if (!value) {
        return "";
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "";
    }

    const year =
        date
            .getUTCFullYear()
            .toString();

    const month =
        String(
            date.getUTCMonth() + 1
        ).padStart(
            2,
            "0"
        );

    return `${year}-${month}`;
}


function serializePublishedProject(
    project
) {
    if (
        !project ||
        !project.published
    ) {
        return null;
    }

    return {
        id: project.slug,
        ...project.published,

        sortDate:
            normalizeSortDate(
                project.published.sortDate
            ),
    };
}


export async function getPublishedProjects(
    request,
    response
) {
    try {
        const projects =
            await Project.find({
                publicationStatus:
                    "published",

                isArchived:
                    false,

                published: {
                    $exists: true,
                },
            })
                .select(
                    buildListProjection()
                )
                .sort({
                    "published.order": 1,
                    "published.sortDate": -1,
                    slug: 1,
                })
                .lean();

        const publicProjects =
            projects
                .map(
                    serializePublishedProject
                )
                .filter(Boolean);

        response.set(
            "Cache-Control",
            "public, max-age=60, stale-while-revalidate=300"
        );

        return response
            .status(200)
            .json({
                status:
                    "success",

                data:
                    publicProjects,
            });
    } catch (error) {
        console.error(
            "Public project list error:",
            error
        );

        return response
            .status(500)
            .json({
                status: "error",

                message:
                    "Unable to load projects right now.",
            });
    }
}


export async function getPublishedProjectBySlug(
    request,
    response
) {
    const rawSlug =
        request.params.slug;

    const slug =
        typeof rawSlug ===
            "string"
            ? rawSlug.trim()
            : "";

    if (
        !slug ||
        !SLUG_PATTERN.test(
            slug
        )
    ) {
        return response
            .status(400)
            .json({
                status: "error",

                message:
                    "Invalid project slug.",
            });
    }

    try {
        const project =
            await Project.findOne({
                slug,

                publicationStatus:
                    "published",

                isArchived:
                    false,

                published: {
                    $exists: true,
                },
            })
                .select(
                    "-_id slug published"
                )
                .lean();

        if (
            !project ||
            !project.published
        ) {
            return response
                .status(404)
                .json({
                    status:
                        "error",

                    message:
                        "Project not found.",
                });
        }

        const publicProject =
            serializePublishedProject(
                project
            );

        response.set(
            "Cache-Control",
            "public, max-age=60, stale-while-revalidate=300"
        );

        return response
            .status(200)
            .json({
                status:
                    "success",

                data:
                    publicProject,
            });
    } catch (error) {
        console.error(
            "Public project detail error:",
            error
        );

        return response
            .status(500)
            .json({
                status: "error",

                message:
                    "Unable to load this project right now.",
            });
    }
}