import {
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


function getValidLens(searchValue) {
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

    const initialLens =
        getValidLens(
            searchParams.get(
                "lens"
            )
        );

    const [
        primaryType,
        setPrimaryType,
    ] = useState("all");

    const [
        roleLens,
        setRoleLens,
    ] = useState(initialLens);

    const [
        sortBy,
        setSortBy,
    ] = useState("newest");


    const filteredProjects =
        useMemo(() => {
            const visibleProjects =
                projects.filter(
                    (project) => {
                        const matchesPrimaryType =
                            primaryType ===
                            "all" ||
                            project.displayType ===
                            primaryType;

                        const projectRoleLens =
                            Array.isArray(
                                project.roleLens
                            )
                                ? project.roleLens
                                : [];

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
                        firstProject.sortDate
                            ? new Date(
                                `${firstProject.sortDate}-01T00:00:00Z`
                            ).getTime()
                            : 0;

                    const secondDate =
                        secondProject.sortDate
                            ? new Date(
                                `${secondProject.sortDate}-01T00:00:00Z`
                            ).getTime()
                            : 0;

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
            projects,
            primaryType,
            roleLens,
            sortBy,
        ]);


    function handleLensChange(
        nextLens
    ) {
        setRoleLens(
            nextLens
        );

        if (
            nextLens === "all"
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

        setSearchParams(
            {}
        );
    }


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
                                                    setPrimaryType(
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
                                        appear
                                        here
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
                                        work type
                                        or role
                                        lens.
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
                            <ProjectGrid
                                projects={
                                    filteredProjects
                                }
                            />
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