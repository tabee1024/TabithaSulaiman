import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Link,
    useSearchParams,
} from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProjectGrid from "../components/projects/ProjectGrid";
import usePublicProjects from "../hooks/usePublicProjects";


const primaryFilters = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Case Studies",
        value: "case-study",
    },
    {
        label: "Experience",
        value: "experience",
    },
    {
        label: "Projects",
        value: "project",
    },
    {
        label: "Leadership",
        value: "leadership",
    },
];


const roleLensFilters = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Product",
        value: "product",
    },
    {
        label: "UX / UI",
        value: "ux-ui",
    },
    {
        label: "Engineering",
        value: "engineering",
    },
];


const sortOptions = [
    {
        label: "Newest",
        value: "newest",
    },
    {
        label: "Oldest",
        value: "oldest",
    },
    {
        label: "Featured",
        value: "featured",
    },
    {
        label: "A-Z",
        value: "az",
    },
];


const workSkillGroups = [
    {
        title: "Languages",
        skills: [
            "JavaScript",
            "Python",
            "Java",
        ],
    },
    {
        title: "Frontend",
        skills: [
            "React",
            "Vite",
            "HTML",
            "CSS",
        ],
    },
    {
        title: "Backend & Data",
        skills: [
            "Node.js",
            "Express",
            "MongoDB",
            "Mongoose",
        ],
    },
    {
        title: "Product & Systems",
        skills: [
            "UX Flows",
            "REST APIs",
            "Data Flow",
            "Security",
        ],
    },
];


const lensConfigurations = {
    all: {
        heading:
            "Browse across the full portfolio.",
        description:
            "Filter the full set by transferable skills and the technologies used to deliver the work.",
        firstLabel:
            "Skills",
        secondLabel:
            "Technology",
    },

    product: {
        heading:
            "Product perspective.",
        description:
            "Focus on problem framing, product decisions, user value, business context, and measurable outcomes.",
        firstLabel:
            "Product Practice",
        secondLabel:
            "User or Business Context",
    },

    "ux-ui": {
        heading:
            "UX / UI perspective.",
        description:
            "Focus on research, flows, information architecture, interaction decisions, and experience quality.",
        firstLabel:
            "UX Method",
        secondLabel:
            "Design or Interaction",
    },

    engineering: {
        heading:
            "Engineering perspective.",
        description:
            "Focus on implementation choices, languages, frameworks, APIs, data, infrastructure, and system constraints.",
        firstLabel:
            "Languages & Frameworks",
        secondLabel:
            "Systems & Infrastructure",
    },
};


function getValidLens(
    searchValue
) {
    const validLensValues =
        roleLensFilters.map(
            (filter) =>
                filter.value
        );

    if (
        validLensValues.includes(
            searchValue
        )
    ) {
        return searchValue;
    }

    return "all";
}


function normalizeArray(
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


function uniqueSorted(
    values
) {
    return [
        ...new Set(
            values
        ),
    ].sort(
        (firstValue, secondValue) =>
            firstValue.localeCompare(
                secondValue
            )
    );
}


function getFirstExistingArray(
    source,
    possibleKeys
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
        of possibleKeys
    ) {
        const values =
            normalizeArray(
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


function getContextualValues(
    project,
    lens,
    position
) {
    const skills =
        normalizeArray(
            project.skills
        );

    const tools =
        normalizeArray(
            project.tools
        );

    const cardTags =
        normalizeArray(
            project.cardTags
        );

    const filterFacets =
        project.filterFacets ||
        {};


    if (
        lens === "all"
    ) {
        return position ===
            "first"
            ? skills
            : tools;
    }


    if (
        lens === "product"
    ) {
        const productFacets =
            filterFacets.product ||
            {};

        if (
            position ===
            "first"
        ) {
            const configuredValues =
                getFirstExistingArray(
                    productFacets,
                    [
                        "practice",
                        "practices",
                        "productPractice",
                        "productPractices",
                    ]
                );

            return configuredValues
                .length > 0
                ? configuredValues
                : skills;
        }

        const configuredValues =
            getFirstExistingArray(
                productFacets,
                [
                    "context",
                    "contexts",
                    "userBusinessContext",
                    "userOrBusinessContext",
                    "businessContext",
                ]
            );

        return configuredValues
            .length > 0
            ? configuredValues
            : cardTags;
    }


    if (
        lens === "ux-ui"
    ) {
        const uxFacets =
            filterFacets.ux ||
            filterFacets["ux-ui"] ||
            {};

        if (
            position ===
            "first"
        ) {
            const configuredValues =
                getFirstExistingArray(
                    uxFacets,
                    [
                        "method",
                        "methods",
                        "uxMethod",
                        "uxMethods",
                    ]
                );

            return configuredValues
                .length > 0
                ? configuredValues
                : skills;
        }

        const configuredValues =
            getFirstExistingArray(
                uxFacets,
                [
                    "interaction",
                    "interactions",
                    "designInteraction",
                    "designOrInteraction",
                ]
            );

        return configuredValues
            .length > 0
            ? configuredValues
            : cardTags;
    }


    const engineeringFacets =
        filterFacets.engineering ||
        {};

    if (
        position === "first"
    ) {
        const configuredValues =
            getFirstExistingArray(
                engineeringFacets,
                [
                    "languagesFrameworks",
                    "languagesAndFrameworks",
                    "frameworks",
                    "languageFrameworks",
                ]
            );

        return configuredValues
            .length > 0
            ? configuredValues
            : tools;
    }

    const configuredValues =
        getFirstExistingArray(
            engineeringFacets,
            [
                "systemsInfrastructure",
                "systemsAndInfrastructure",
                "infrastructure",
                "systems",
            ]
        );

    return configuredValues
        .length > 0
        ? configuredValues
        : [
            ...tools,
            ...skills,
        ];
}


function projectMatchesContextFilter(
    project,
    lens,
    position,
    selectedValue
) {
    if (
        selectedValue ===
        "all"
    ) {
        return true;
    }

    const values =
        getContextualValues(
            project,
            lens,
            position
        );

    return values.includes(
        selectedValue
    );
}


function getProjectTimestamp(
    project
) {
    if (
        !project.sortDate
    ) {
        return 0;
    }

    const date =
        new Date(
            `${project.sortDate}-01T00:00:00Z`
        );

    const timestamp =
        date.getTime();

    return Number.isNaN(
        timestamp
    )
        ? 0
        : timestamp;
}


function Projects() {
    const {
        projects,
        isLoading,
        error,
        reload,
    } = usePublicProjects();

    const [
        searchParams,
        setSearchParams,
    ] = useSearchParams();

    const [
        primaryType,
        setPrimaryType,
    ] = useState("all");

    const [
        roleLens,
        setRoleLens,
    ] = useState(
        getValidLens(
            searchParams.get(
                "lens"
            )
        )
    );

    const [
        sortBy,
        setSortBy,
    ] = useState("newest");

    const [
        firstContextFilter,
        setFirstContextFilter,
    ] = useState("all");

    const [
        secondContextFilter,
        setSecondContextFilter,
    ] = useState("all");


    useEffect(() => {
        const nextLens =
            getValidLens(
                searchParams.get(
                    "lens"
                )
            );

        setRoleLens(
            nextLens
        );
    }, [searchParams]);


    const lensConfiguration =
        lensConfigurations[
        roleLens
        ] ||
        lensConfigurations.all;


    const lensEligibleProjects =
        useMemo(() => {
            return projects.filter(
                (project) => {
                    const projectRoleLens =
                        normalizeArray(
                            project.roleLens
                        );

                    const matchesPrimaryType =
                        primaryType ===
                        "all" ||
                        project.displayType ===
                        primaryType;

                    const matchesRoleLens =
                        roleLens ===
                        "all" ||
                        projectRoleLens.includes(
                            roleLens
                        );

                    return (
                        matchesPrimaryType &&
                        matchesRoleLens
                    );
                }
            );
        }, [
            projects,
            primaryType,
            roleLens,
        ]);


    const firstContextOptions =
        useMemo(() => {
            return uniqueSorted(
                lensEligibleProjects.flatMap(
                    (project) =>
                        getContextualValues(
                            project,
                            roleLens,
                            "first"
                        )
                )
            );
        }, [
            lensEligibleProjects,
            roleLens,
        ]);


    const secondContextOptions =
        useMemo(() => {
            return uniqueSorted(
                lensEligibleProjects.flatMap(
                    (project) =>
                        getContextualValues(
                            project,
                            roleLens,
                            "second"
                        )
                )
            );
        }, [
            lensEligibleProjects,
            roleLens,
        ]);


    const filteredProjects =
        useMemo(() => {
            const visibleProjects =
                lensEligibleProjects.filter(
                    (project) => {
                        const matchesFirst =
                            projectMatchesContextFilter(
                                project,
                                roleLens,
                                "first",
                                firstContextFilter
                            );

                        const matchesSecond =
                            projectMatchesContextFilter(
                                project,
                                roleLens,
                                "second",
                                secondContextFilter
                            );

                        return (
                            matchesFirst &&
                            matchesSecond
                        );
                    }
                );

            return [
                ...visibleProjects,
            ].sort(
                (
                    firstProject,
                    secondProject
                ) => {
                    if (
                        sortBy ===
                        "featured"
                    ) {
                        const featuredDifference =
                            Number(
                                secondProject.featured
                            ) -
                            Number(
                                firstProject.featured
                            );

                        if (
                            featuredDifference !==
                            0
                        ) {
                            return featuredDifference;
                        }

                        return (
                            Number(
                                firstProject.order ??
                                0
                            ) -
                            Number(
                                secondProject.order ??
                                0
                            )
                        );
                    }

                    if (
                        sortBy ===
                        "az"
                    ) {
                        return (
                            firstProject.title ||
                            ""
                        ).localeCompare(
                            secondProject.title ||
                            ""
                        );
                    }

                    const firstDate =
                        getProjectTimestamp(
                            firstProject
                        );

                    const secondDate =
                        getProjectTimestamp(
                            secondProject
                        );

                    if (
                        sortBy ===
                        "oldest"
                    ) {
                        return (
                            firstDate -
                            secondDate
                        );
                    }

                    return (
                        secondDate -
                        firstDate
                    );
                }
            );
        }, [
            lensEligibleProjects,
            roleLens,
            firstContextFilter,
            secondContextFilter,
            sortBy,
        ]);


    function handleLensChange(
        nextLens
    ) {
        setRoleLens(
            nextLens
        );

        setFirstContextFilter(
            "all"
        );

        setSecondContextFilter(
            "all"
        );

        if (
            nextLens ===
            "all"
        ) {
            setSearchParams(
                {}
            );

            return;
        }

        setSearchParams({
            lens: nextLens,
        });
    }


    function handlePrimaryTypeChange(
        nextType
    ) {
        setPrimaryType(
            nextType
        );

        setFirstContextFilter(
            "all"
        );

        setSecondContextFilter(
            "all"
        );
    }


    function clearFilters() {
        setPrimaryType(
            "all"
        );

        setRoleLens(
            "all"
        );

        setSortBy(
            "newest"
        );

        setFirstContextFilter(
            "all"
        );

        setSecondContextFilter(
            "all"
        );

        setSearchParams(
            {}
        );
    }


    const hasActiveFilters =
        primaryType !==
        "all" ||
        roleLens !== "all" ||
        firstContextFilter !==
        "all" ||
        secondContextFilter !==
        "all" ||
        sortBy !==
        "newest";


    return (
        <>
            <Navbar />

            <main className="home-page projects-page work-mockup-page">
                <section
                    className="home-section work-hero-section"
                    aria-labelledby="projects-page-title"
                >
                    <div className="work-page-header">
                        <div>
                            <p className="eyebrow">
                                Work
                            </p>

                            <h1 id="projects-page-title">
                                Work
                            </h1>

                            <p>
                                Explore all my
                                work or filter
                                by what matters
                                most to you.
                            </p>
                        </div>

                        <div
                            className="work-page-note"
                            aria-label="Work page guidance"
                        >
                            <p>
                                Browse by work
                                type, role lens,
                                and technical
                                signal to
                                quickly find
                                the proof that
                                matches what
                                you are
                                reviewing.
                            </p>
                        </div>
                    </div>


                    <div
                        className="work-control-board"
                        aria-label="Work filters"
                    >
                        <div className="work-control-row">
                            <div>
                                <p className="project-section-label">
                                    Work Type
                                </p>

                                <div className="mockup-filter-row">
                                    {primaryFilters.map(
                                        (
                                            filter
                                        ) => (
                                            <button
                                                className={
                                                    primaryType ===
                                                        filter.value
                                                        ? "mockup-filter-button mockup-filter-button-active"
                                                        : "mockup-filter-button"
                                                }
                                                type="button"
                                                key={
                                                    filter.value
                                                }
                                                onClick={() =>
                                                    handlePrimaryTypeChange(
                                                        filter.value
                                                    )
                                                }
                                            >
                                                {
                                                    filter.label
                                                }
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            <label className="mockup-sort-label">
                                Sort by

                                <select
                                    value={
                                        sortBy
                                    }
                                    onChange={(
                                        event
                                    ) =>
                                        setSortBy(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                >
                                    {sortOptions.map(
                                        (
                                            option
                                        ) => (
                                            <option
                                                value={
                                                    option.value
                                                }
                                                key={
                                                    option.value
                                                }
                                            >
                                                {
                                                    option.label
                                                }
                                            </option>
                                        )
                                    )}
                                </select>
                            </label>
                        </div>


                        <div>
                            <p className="project-section-label">
                                Role Lens
                            </p>

                            <div className="mockup-filter-row">
                                {roleLensFilters.map(
                                    (
                                        filter
                                    ) => (
                                        <button
                                            className={
                                                roleLens ===
                                                    filter.value
                                                    ? "mockup-filter-button mockup-filter-button-active"
                                                    : "mockup-filter-button"
                                            }
                                            type="button"
                                            key={
                                                filter.value
                                            }
                                            onClick={() =>
                                                handleLensChange(
                                                    filter.value
                                                )
                                            }
                                        >
                                            {
                                                filter.label
                                            }
                                        </button>
                                    )
                                )}
                            </div>
                        </div>


                        <div
                            className="work-lens-context"
                            key={
                                roleLens
                            }
                        >
                            <div className="work-lens-context-copy">
                                <p className="project-section-label">
                                    {
                                        lensConfiguration.heading
                                    }
                                </p>

                                <p>
                                    {
                                        lensConfiguration.description
                                    }
                                </p>
                            </div>

                            <div className="work-context-selects">
                                <label className="work-context-select">
                                    <span>
                                        {
                                            lensConfiguration.firstLabel
                                        }
                                    </span>

                                    <select
                                        value={
                                            firstContextFilter
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setFirstContextFilter(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                    >
                                        <option value="all">
                                            All
                                        </option>

                                        {firstContextOptions.map(
                                            (
                                                option
                                            ) => (
                                                <option
                                                    key={
                                                        option
                                                    }
                                                    value={
                                                        option
                                                    }
                                                >
                                                    {
                                                        option
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                </label>


                                <label className="work-context-select">
                                    <span>
                                        {
                                            lensConfiguration.secondLabel
                                        }
                                    </span>

                                    <select
                                        value={
                                            secondContextFilter
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setSecondContextFilter(
                                                event
                                                    .target
                                                    .value
                                            )
                                        }
                                    >
                                        <option value="all">
                                            All
                                        </option>

                                        {secondContextOptions.map(
                                            (
                                                option
                                            ) => (
                                                <option
                                                    key={
                                                        option
                                                    }
                                                    value={
                                                        option
                                                    }
                                                >
                                                    {
                                                        option
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                </label>
                            </div>
                        </div>


                        {(roleLens !==
                            "all" ||
                            firstContextFilter !==
                            "all" ||
                            secondContextFilter !==
                            "all") && (
                                <div
                                    className="work-selected-filters"
                                    aria-label="Selected filters"
                                >
                                    {roleLens !==
                                        "all" && (
                                            <span>
                                                Role:{" "}
                                                {
                                                    roleLensFilters.find(
                                                        (
                                                            filter
                                                        ) =>
                                                            filter.value ===
                                                            roleLens
                                                    )
                                                        ?.label
                                                }
                                            </span>
                                        )}

                                    {firstContextFilter !==
                                        "all" && (
                                            <span>
                                                {
                                                    lensConfiguration.firstLabel
                                                }
                                                :{" "}
                                                {
                                                    firstContextFilter
                                                }
                                            </span>
                                        )}

                                    {secondContextFilter !==
                                        "all" && (
                                            <span>
                                                {
                                                    lensConfiguration.secondLabel
                                                }
                                                :{" "}
                                                {
                                                    secondContextFilter
                                                }
                                            </span>
                                        )}
                                </div>
                            )}


                        <div className="work-control-footer">
                            <p
                                aria-live="polite"
                            >
                                Showing{" "}
                                <strong>
                                    {
                                        filteredProjects.length
                                    }
                                </strong>{" "}
                                of{" "}
                                <strong>
                                    {
                                        projects.length
                                    }
                                </strong>{" "}
                                work items.
                            </p>

                            <button
                                className="button button-secondary"
                                type="button"
                                onClick={
                                    clearFilters
                                }
                                disabled={
                                    !hasActiveFilters
                                }
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>


                    <section
                        className="work-skills-section"
                        aria-labelledby="work-skills-title"
                    >
                        <div className="work-skills-heading">
                            <div>
                                <p className="eyebrow">
                                    Skills &
                                    Technology
                                </p>

                                <h2 id="work-skills-title">
                                    Technical
                                    signals across
                                    my work.
                                </h2>
                            </div>

                            <p>
                                A compact
                                overview of the
                                languages,
                                frameworks,
                                data tools, and
                                product methods
                                represented
                                across my
                                portfolio.
                            </p>
                        </div>

                        <div className="work-skills-grid">
                            {workSkillGroups.map(
                                (
                                    group
                                ) => (
                                    <article
                                        className="work-skill-group"
                                        key={
                                            group.title
                                        }
                                    >
                                        <h3>
                                            {
                                                group.title
                                            }
                                        </h3>

                                        <div className="work-skill-tags">
                                            {group.skills.map(
                                                (
                                                    skill
                                                ) => (
                                                    <span
                                                        key={
                                                            skill
                                                        }
                                                    >
                                                        {
                                                            skill
                                                        }
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </article>
                                )
                            )}
                        </div>
                    </section>


                    {isLoading && (
                        <div
                            className="work-project-api-status"
                            role="status"
                            aria-live="polite"
                        >
                            <div>
                                <strong>
                                    Loading
                                    work...
                                </strong>

                                <span>
                                    Getting the
                                    latest
                                    published
                                    project
                                    content.
                                </span>
                            </div>
                        </div>
                    )}


                    {!isLoading &&
                        error && (
                            <div
                                className="work-project-api-status work-project-api-status-error"
                                role="alert"
                            >
                                <div>
                                    <strong>
                                        Projects
                                        are
                                        temporarily
                                        unavailable.
                                    </strong>

                                    <span>
                                        Please try
                                        loading
                                        them again.
                                    </span>
                                </div>

                                <button
                                    className="button button-secondary"
                                    type="button"
                                    onClick={
                                        reload
                                    }
                                >
                                    Try Again
                                </button>
                            </div>
                        )}


                    {!isLoading &&
                        !error &&
                        projects.length ===
                        0 && (
                            <div className="work-project-api-status">
                                <div>
                                    <strong>
                                        No
                                        published
                                        projects
                                        yet.
                                    </strong>

                                    <span>
                                        Published
                                        work will
                                        appear here
                                        automatically.
                                    </span>
                                </div>
                            </div>
                        )}


                    {!isLoading &&
                        !error &&
                        projects.length >
                        0 &&
                        filteredProjects.length ===
                        0 && (
                            <div className="work-project-api-status">
                                <div>
                                    <strong>
                                        No work
                                        matches
                                        these
                                        filters.
                                    </strong>

                                    <span>
                                        Try a
                                        different
                                        filter
                                        combination.
                                    </span>
                                </div>

                                <button
                                    className="button button-secondary"
                                    type="button"
                                    onClick={
                                        clearFilters
                                    }
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}


                    {!isLoading &&
                        !error &&
                        filteredProjects.length >
                        0 && (
                            <div
                                className="work-project-results"
                                key={`${roleLens}-${firstContextFilter}-${secondContextFilter}`}
                            >
                                <ProjectGrid
                                    projects={
                                        filteredProjects
                                    }
                                    activeLens={
                                        roleLens
                                    }
                                />
                            </div>
                        )}


                    <div className="work-bottom-cta">
                        <div>
                            <p className="eyebrow">
                                Have a project
                                or opportunity?
                            </p>

                            <h2>
                                Let&apos;s
                                connect around
                                useful,
                                thoughtful
                                work.
                            </h2>
                        </div>

                        <Link
                            className="button button-primary"
                            to="/contact"
                        >
                            Let&apos;s Connect
                            →
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}


export default Projects;