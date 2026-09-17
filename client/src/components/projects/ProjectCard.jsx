import { Link } from "react-router-dom";


const lensLabels = {
    product:
        "Product Evidence",

    "ux-ui":
        "UX / UI Evidence",

    engineering:
        "Engineering Evidence",
};


const lensEvidenceKeys = {
    product:
        "product",

    "ux-ui":
        "ux",

    engineering:
        "engineering",
};


function normalizeStringArray(
    value
) {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .filter(
            (item) =>
                typeof item ===
                "string" &&
                item.trim()
        )
        .map(
            (item) =>
                item.trim()
        );
}


function uniqueValues(
    values
) {
    return [
        ...new Set(
            values.filter(
                Boolean
            )
        ),
    ];
}


function getFirstString(
    source,
    keys
) {
    if (
        !source ||
        typeof source !==
        "object"
    ) {
        return "";
    }

    for (
        const key
        of keys
    ) {
        if (
            typeof source[key] ===
            "string" &&
            source[key].trim()
        ) {
            return source[
                key
            ].trim();
        }
    }

    return "";
}


function getFirstArray(
    source,
    keys
) {
    if (
        !source ||
        typeof source !==
        "object"
    ) {
        return [];
    }

    for (
        const key
        of keys
    ) {
        const values =
            normalizeStringArray(
                source[key]
            );

        if (
            values.length > 0
        ) {
            return values;
        }
    }

    return [];
}


function getEvidenceRecord(
    project,
    activeLens
) {
    if (
        activeLens === "all"
    ) {
        return null;
    }

    const evidenceKey =
        lensEvidenceKeys[
        activeLens
        ];

    if (
        !evidenceKey
    ) {
        return null;
    }

    const evidence =
        project.lensEvidence?.[
        evidenceKey
        ];

    if (
        typeof evidence ===
        "string"
    ) {
        return {
            summary:
                evidence,
        };
    }

    if (
        Array.isArray(
            evidence
        )
    ) {
        return {
            evidence,
        };
    }

    if (
        evidence &&
        typeof evidence ===
        "object"
    ) {
        return evidence;
    }

    return null;
}


function getFacetValues(
    project,
    activeLens
) {
    const facets =
        project.filterFacets ||
        {};

    if (
        activeLens ===
        "product"
    ) {
        const product =
            facets.product ||
            {};

        return uniqueValues([
            ...getFirstArray(
                product,
                [
                    "practice",
                    "practices",
                    "productPractice",
                    "productPractices",
                ]
            ),

            ...getFirstArray(
                product,
                [
                    "context",
                    "contexts",
                    "userBusinessContext",
                    "userOrBusinessContext",
                    "businessContext",
                ]
            ),
        ]);
    }


    if (
        activeLens ===
        "ux-ui"
    ) {
        const ux =
            facets.ux ||
            facets["ux-ui"] ||
            {};

        return uniqueValues([
            ...getFirstArray(
                ux,
                [
                    "method",
                    "methods",
                    "uxMethod",
                    "uxMethods",
                ]
            ),

            ...getFirstArray(
                ux,
                [
                    "interaction",
                    "interactions",
                    "designInteraction",
                    "designOrInteraction",
                ]
            ),
        ]);
    }


    if (
        activeLens ===
        "engineering"
    ) {
        const engineering =
            facets.engineering ||
            {};

        return uniqueValues([
            ...getFirstArray(
                engineering,
                [
                    "languagesFrameworks",
                    "languagesAndFrameworks",
                    "frameworks",
                    "languageFrameworks",
                ]
            ),

            ...getFirstArray(
                engineering,
                [
                    "systemsInfrastructure",
                    "systemsAndInfrastructure",
                    "infrastructure",
                    "systems",
                ]
            ),
        ]);
    }

    return [];
}


function getLensContent(
    project,
    activeLens
) {
    const defaultSummary =
        project.summary ||
        project.shortValue ||
        project.cardOutcome ||
        "";

    const defaultFocusTags =
        uniqueValues([
            ...normalizeStringArray(
                project.cardTags
            ),
            ...normalizeStringArray(
                project.thinkingLenses
            ),
        ]).slice(
            0,
            3
        );

    const defaultTools =
        normalizeStringArray(
            project.tools
        ).slice(
            0,
            3
        );


    if (
        activeLens === "all"
    ) {
        return {
            label: "",
            summary:
                defaultSummary,

            evidence:
                "",

            focusTags:
                defaultFocusTags,

            toolTags:
                defaultTools,
        };
    }


    const evidenceRecord =
        getEvidenceRecord(
            project,
            activeLens
        );


    const lensSummary =
        typeof evidenceRecord ===
            "string"
            ? evidenceRecord
            : getFirstString(
                evidenceRecord,
                [
                    "summary",
                    "description",
                    "headline",
                    "focus",
                    "value",
                ]
            );


    const evidencePoints =
        getFirstArray(
            evidenceRecord,
            [
                "evidence",
                "proofPoints",
                "highlights",
                "points",
                "decisions",
                "bullets",
            ]
        );


    const evidenceTags =
        getFirstArray(
            evidenceRecord,
            [
                "tags",
                "skills",
                "tools",
                "methods",
            ]
        );


    const facetValues =
        getFacetValues(
            project,
            activeLens
        );


    const fallbackProofPoints =
        normalizeStringArray(
            project.proofPoints
        );


    let toolTags =
        defaultTools;

    if (
        activeLens ===
        "product"
    ) {
        toolTags =
            normalizeStringArray(
                project.skills
            ).slice(
                0,
                3
            );
    }

    if (
        activeLens ===
        "ux-ui"
    ) {
        toolTags =
            uniqueValues([
                ...normalizeStringArray(
                    project.skills
                ),
                ...normalizeStringArray(
                    project.cardTags
                ),
            ]).slice(
                0,
                3
            );
    }


    return {
        label:
            lensLabels[
            activeLens
            ] ||
            "Project Evidence",

        summary:
            lensSummary ||
            project.cardOutcome ||
            project.shortValue ||
            defaultSummary,

        evidence:
            evidencePoints[0] ||
            fallbackProofPoints[0] ||
            "",

        focusTags:
            uniqueValues([
                ...evidenceTags,
                ...facetValues,
                ...defaultFocusTags,
            ]).slice(
                0,
                3
            ),

        toolTags:
            toolTags.slice(
                0,
                3
            ),
    };
}


function isSafeExternalUrl(
    value
) {
    if (
        typeof value !==
        "string"
    ) {
        return false;
    }

    return (
        value.startsWith(
            "https://"
        ) ||
        value.startsWith(
            "http://"
        )
    );
}


function ProjectCard({
    project,
    activeLens = "all",
}) {
    const lensContent =
        getLensContent(
            project,
            activeLens
        );

    const detailPath =
        `/projects/${project.id}`;

    const githubUrl =
        project.links?.github ||
        "";

    const liveUrl =
        project.links?.live ||
        "";

    const showGithub =
        isSafeExternalUrl(
            githubUrl
        );

    const showLive =
        isSafeExternalUrl(
            liveUrl
        );


    return (
        <article
            className={`mockup-work-card ${activeLens !==
                    "all"
                    ? "mockup-work-card-lens-active"
                    : ""
                }`}
        >
            <div
                className="mockup-work-card-media"
                aria-hidden="true"
            >
                <div className="mockup-card-browser-bar">
                    <span />
                    <span />
                    <span />
                </div>

                <div className="mockup-card-screen">
                    <div className="mockup-card-screen-block mockup-card-screen-block-large" />

                    <div className="mockup-card-screen-row">
                        <span />
                        <span />
                        <span />
                    </div>

                    <span className="mockup-card-screen-line" />

                    <span className="mockup-card-screen-line short" />
                </div>
            </div>


            <div className="mockup-work-card-body">
                <div className="mockup-work-card-header">
                    <span className="mockup-card-badge">
                        {project.featured
                            ? "Featured"
                            : project.type ||
                            "Project"}
                    </span>

                    {project.status && (
                        <span className="mockup-card-badge mockup-card-badge-status">
                            {
                                project.status
                            }
                        </span>
                    )}
                </div>


                <div>
                    <h3>
                        {
                            project.title
                        }
                    </h3>

                    {project.subtitle && (
                        <p className="mockup-work-card-subtitle">
                            {
                                project.subtitle
                            }
                        </p>
                    )}
                </div>


                {lensContent.label && (
                    <p className="mockup-lens-evidence-label">
                        {
                            lensContent.label
                        }
                    </p>
                )}


                <p className="mockup-work-card-summary">
                    {
                        lensContent.summary
                    }
                </p>


                {lensContent.evidence && (
                    <p className="mockup-lens-evidence">
                        {
                            lensContent.evidence
                        }
                    </p>
                )}


                {lensContent.focusTags.length >
                    0 && (
                        <div
                            className="mockup-lens-row"
                            aria-label={
                                activeLens ===
                                    "all"
                                    ? "Project focus"
                                    : `${lensContent.label} focus`
                            }
                        >
                            {lensContent.focusTags.map(
                                (
                                    tag
                                ) => (
                                    <span
                                        key={
                                            tag
                                        }
                                    >
                                        {
                                            tag
                                        }
                                    </span>
                                )
                            )}
                        </div>
                    )}


                {lensContent.toolTags.length >
                    0 && (
                        <div
                            className="mockup-tool-row"
                            aria-label="Project tools and skills"
                        >
                            {lensContent.toolTags.map(
                                (
                                    tool
                                ) => (
                                    <span
                                        key={
                                            tool
                                        }
                                    >
                                        {
                                            tool
                                        }
                                    </span>
                                )
                            )}
                        </div>
                    )}
            </div>


            <footer className="mockup-work-card-footer">
                <Link
                    to={
                        detailPath
                    }
                >
                    {project.detailCta ||
                        "View Project"}
                    {" →"}
                </Link>

                {(showGithub ||
                    showLive) && (
                        <div>
                            {showGithub && (
                                <a
                                    href={
                                        githubUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    GitHub
                                </a>
                            )}

                            {showLive && (
                                <a
                                    href={
                                        liveUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Live
                                </a>
                            )}
                        </div>
                    )}
            </footer>
        </article>
    );
}


export default ProjectCard;