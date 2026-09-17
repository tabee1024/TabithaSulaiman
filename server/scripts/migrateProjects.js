import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
import mongoose from "mongoose";

import Project from "../models/Project.js";
import projects from "../../client/src/data/projects.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({
    path: path.resolve(
        __dirname,
        "../.env"
    ),
});


const WRITE_MODE =
    process.argv.includes("--write");


const ALLOWED_ROLE_LENSES =
    new Set([
        "product",
        "ux-ui",
        "engineering",
    ]);


const PROJECT_CONTENT_FIELDS = [
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
    "order",
    "summary",
    "shortValue",
    "problem",
    "solution",
    "impact",
    "cardOutcome",
    "thinkingLenses",
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


function normalizeRoleLenses(
    roleLens = []
) {
    if (!Array.isArray(roleLens)) {
        return [];
    }

    return [
        ...new Set(
            roleLens.filter((lens) => {
                return ALLOWED_ROLE_LENSES.has(
                    lens
                );
            })
        ),
    ];
}


function normalizeSortDate(value) {
    if (!value) {
        return null;
    }


    if (
        typeof value === "string" &&
        /^\d{4}-\d{2}$/.test(value)
    ) {
        const normalizedDate =
            new Date(
                `${value}-01T00:00:00.000Z`
            );


        if (
            Number.isNaN(
                normalizedDate.getTime()
            )
        ) {
            throw new Error(
                `Invalid sortDate: ${value}`
            );
        }


        return normalizedDate;
    }


    const normalizedDate =
        new Date(value);


    if (
        Number.isNaN(
            normalizedDate.getTime()
        )
    ) {
        throw new Error(
            `Invalid sortDate: ${value}`
        );
    }


    return normalizedDate;
}


function buildProjectContent(
    sourceProject
) {
    const content = {};


    for (
        const field of
        PROJECT_CONTENT_FIELDS
    ) {
        if (
            Object.prototype.hasOwnProperty.call(
                sourceProject,
                field
            )
        ) {
            content[field] =
                sourceProject[field];
        }
    }


    content.roleLens =
        normalizeRoleLenses(
            sourceProject.roleLens
        );


    content.sortDate =
        normalizeSortDate(
            sourceProject.sortDate
        );


    return content;
}


async function runMigration() {
    if (!process.env.MONGODB_URI) {
        throw new Error(
            "MONGODB_URI is missing from server/.env"
        );
    }


    console.log("");
    console.log(
        WRITE_MODE
            ? "PROJECT MIGRATION — WRITE MODE"
            : "PROJECT MIGRATION — DRY RUN"
    );
    console.log(
        "--------------------------------"
    );


    await mongoose.connect(
        process.env.MONGODB_URI
    );


    console.log("MongoDB connected.");
    console.log(
        `Source projects: ${projects.length}`
    );


    const slugs =
        projects.map(
            (project) => project.id
        );


    const existingProjects =
        await Project.find({
            slug: {
                $in: slugs,
            },
        })
            .select("slug")
            .lean();


    const existingSlugs =
        new Set(
            existingProjects.map(
                (project) =>
                    project.slug
            )
        );


    let validCount = 0;
    let createdCount = 0;
    let skippedCount = 0;


    for (const sourceProject of projects) {
        const slug =
            sourceProject.id;


        if (
            typeof slug !== "string" ||
            !slug.trim()
        ) {
            throw new Error(
                "Every source project must have an id."
            );
        }


        if (existingSlugs.has(slug)) {
            console.log(
                `SKIP     ${slug} — already exists`
            );

            skippedCount += 1;

            continue;
        }


        const draft =
            buildProjectContent(
                sourceProject
            );


        const published =
            structuredClone(draft);


        const candidate =
            new Project({
                slug,

                draft,

                published,

                publicationStatus:
                    "published",

                isArchived: false,

                publishedAt:
                    new Date(),

                revision: 1,
            });


        // Validate against the real Mongoose
        // Project schema before any write.
        await candidate.validate();


        validCount += 1;


        if (!WRITE_MODE) {
            console.log(
                `VALID    ${slug}`
            );

            continue;
        }


        await candidate.save();


        createdCount += 1;


        console.log(
            `CREATED  ${slug}`
        );
    }


    console.log("");
    console.log(
        "--------------------------------"
    );

    console.log(
        `Validated: ${validCount}`
    );

    console.log(
        `Created:   ${createdCount}`
    );

    console.log(
        `Skipped:   ${skippedCount}`
    );


    if (!WRITE_MODE) {
        console.log("");
        console.log(
            "Dry run only — MongoDB project content was not changed."
        );

        console.log(
            "Run again with --write only after reviewing these results."
        );
    }
}


try {
    await runMigration();
} catch (error) {
    console.error("");
    console.error(
        "Migration failed:"
    );

    console.error(
        error instanceof Error
            ? error.message
            : error
    );

    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}