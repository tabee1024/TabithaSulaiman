import {
    useEffect,
    useState,
} from "react";

import {
    Link,
    useParams,
} from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProjectMedia from "../components/projects/ProjectMedia";


const detailTabs = [
    {
        id: "overview",
        label: "Overview",
    },
    {
        id: "product",
        label: "Product",
    },
    {
        id: "ux-ui",
        label: "UI/UX",
    },
    {
        id: "engineering",
        label: "Engineering",
    },
];


function renderList(
    items,
    fallback =
        "Details will be added as this project develops."
) {
    if (
        !Array.isArray(
            items
        ) ||
        items.length === 0
    ) {
        return (
            <p>
                {fallback}
            </p>
        );
    }

    return (
        <ul className="case-study-list">
            {items.map(
                (
                    item
                ) => (
                    <li
                        key={
                            item
                        }
                    >
                        {
                            item
                        }
                    </li>
                )
            )}
        </ul>
    );
}


function getTabContent(
    project,
    activeTab
) {
    const caseStudy =
        project.caseStudy ||
        {};


    if (
        activeTab ===
        "product"
    ) {
        return {
            eyebrow:
                "Product Perspective",

            title:
                "How I framed the problem and made product decisions.",

            problemTitle:
                "User need",

            problemText:
                caseStudy.userNeed ||
                project.problem ||
                "Product context will be added.",

            solutionTitle:
                "Product decisions",

            solutionContent:
                renderList(
                    caseStudy.productDecisions
                ),

            impactTitle:
                "Tradeoffs",

            impactContent:
                renderList(
                    caseStudy.tradeoffs
                ),
        };
    }


    if (
        activeTab ===
        "ux-ui"
    ) {
        return {
            eyebrow:
                "UI/UX Perspective",

            title:
                "How I shaped the experience around clarity and usability.",

            problemTitle:
                "Design challenge",

            problemText:
                project.problem ||
                caseStudy.userNeed ||
                "Design context will be added.",

            solutionTitle:
                "Design decisions",

            solutionContent:
                renderList(
                    caseStudy.designDecisions
                ),

            impactTitle:
                "Experience impact",

            impactContent: (
                <p>
                    {project.impact ||
                        project.cardOutcome ||
                        "Experience impact will be added."}
                </p>
            ),
        };
    }


    if (
        activeTab ===
        "engineering"
    ) {
        return {
            eyebrow:
                "Engineering Perspective",

            title:
                "How I approached the technical architecture.",

            problemTitle:
                "Technical challenge",

            problemText:
                project.problem ||
                "Technical context will be added.",

            solutionTitle:
                "Engineering decisions",

            solutionContent:
                renderList(
                    caseStudy.engineeringDecisions
                ),

            impactTitle:
                "Technical outcome",

            impactContent: (
                <p>
                    {project.cardOutcome ||
                        project.impact ||
                        "Technical outcome will be added."}
                </p>
            ),
        };
    }


    return {
        eyebrow:
            "Overview",

        title:
            "How the project comes together.",

        problemTitle:
            "The problem",

        problemText:
            project.problem ||
            "Project context will be added.",

        solutionTitle:
            "The solution",

        solutionContent: (
            <p>
                {project.solution ||
                    project.summary ||
                    "Solution details will be added."}
            </p>
        ),

        impactTitle:
            "Impact",

        impactContent: (
            <p>
                {project.impact ||
                    project.cardOutcome ||
                    "Impact details will be added."}
            </p>
        ),
    };
}


function ProjectDetails() {
    const {
        projectId,
    } = useParams();

    const [
        activeTab,
        setActiveTab,
    ] = useState(
        "overview"
    );

    const [
        project,
        setProject,
    ] = useState(
        null
    );

    const [
        isLoading,
        setIsLoading,
    ] = useState(
        true
    );

    const [
        error,
        setError,
    ] = useState(
        ""
    );

    const [
        isNotFound,
        setIsNotFound,
    ] = useState(
        false
    );

    const [
        reloadKey,
        setReloadKey,
    ] = useState(
        0
    );


    useEffect(() => {
        const controller =
            new AbortController();


        async function loadProject() {
            try {
                setIsLoading(
                    true
                );

                setError(
                    ""
                );

                setIsNotFound(
                    false
                );

                setProject(
                    null
                );

                setActiveTab(
                    "overview"
                );


                const response =
                    await fetch(
                        `/api/projects/${encodeURIComponent(
                            projectId
                        )}`,
                        {
                            method:
                                "GET",

                            signal:
                                controller.signal,
                        }
                    );


                const result =
                    await response.json();


                if (
                    response.status ===
                    404
                ) {
                    setIsNotFound(
                        true
                    );

                    return;
                }


                if (
                    !response.ok
                ) {
                    throw new Error(
                        result.message ||
                        "Unable to load this project."
                    );
                }


                if (
                    !result.data
                ) {
                    throw new Error(
                        "The project response was empty."
                    );
                }


                setProject(
                    result.data
                );
            } catch (
            loadError
            ) {
                if (
                    loadError.name ===
                    "AbortError"
                ) {
                    return;
                }

                setError(
                    loadError.message ||
                    "Unable to load this project."
                );
            } finally {
                if (
                    !controller.signal
                        .aborted
                ) {
                    setIsLoading(
                        false
                    );
                }
            }
        }


        loadProject();


        return () => {
            controller.abort();
        };
    }, [
        projectId,
        reloadKey,
    ]);


    if (isLoading) {
        return (
            <>
                <Navbar />

                <main className="home-page case-study-page">
                    <section
                        className="home-section"
                        aria-live="polite"
                    >
                        <div className="content-card">
                            <p className="eyebrow">
                                Deep Dive
                            </p>

                            <h1>
                                Loading
                                project...
                            </h1>

                            <p>
                                Getting the
                                latest
                                published
                                project
                                content.
                            </p>
                        </div>
                    </section>
                </main>

                <Footer />
            </>
        );
    }


    if (isNotFound) {
        return (
            <>
                <Navbar />

                <main className="home-page case-study-page">
                    <section className="home-section">
                        <div className="content-card">
                            <p className="eyebrow">
                                Project Not
                                Found
                            </p>

                            <h1>
                                This work
                                item is not
                                available.
                            </h1>

                            <p>
                                The link may
                                be incorrect
                                or the
                                project may
                                not currently
                                be
                                published.
                            </p>

                            <Link
                                className="button button-primary"
                                to="/projects"
                            >
                                Back to Work
                            </Link>
                        </div>
                    </section>
                </main>

                <Footer />
            </>
        );
    }


    if (
        error ||
        !project
    ) {
        return (
            <>
                <Navbar />

                <main className="home-page case-study-page">
                    <section className="home-section">
                        <div className="content-card">
                            <p className="eyebrow">
                                Project
                                Unavailable
                            </p>

                            <h1>
                                This project
                                could not be
                                loaded.
                            </h1>

                            <p>
                                {error ||
                                    "Please try again."}
                            </p>

                            <button
                                className="button button-secondary"
                                type="button"
                                onClick={() =>
                                    setReloadKey(
                                        (
                                            currentKey
                                        ) =>
                                            currentKey +
                                            1
                                    )
                                }
                            >
                                Try Again
                            </button>
                        </div>
                    </section>
                </main>

                <Footer />
            </>
        );
    }


    const tabContent =
        getTabContent(
            project,
            activeTab
        );

    const caseStudy =
        project.caseStudy ||
        {};

    const highlights =
        Array.isArray(
            project.proofPoints
        )
            ? project.proofPoints
            : [];

    const takeaways =
        Array.isArray(
            caseStudy.tradeoffs
        )
            ? caseStudy.tradeoffs
            : [];

    const futureWork =
        Array.isArray(
            caseStudy.nextSteps
        )
            ? caseStudy.nextSteps
            : [];

    const tools =
        Array.isArray(
            project.tools
        )
            ? project.tools
            : [];

    const liveUrl =
        project.links?.live ||
        "";

    const githubUrl =
        project.links?.github ||
        "";


    return (
        <>
            <Navbar />

            <main className="home-page case-study-page">
                <section
                    className="home-section case-study-hero-section"
                    aria-labelledby="case-study-title"
                >
                    <div className="case-study-back-row">
                        <Link
                            className="project-back-link"
                            to="/projects"
                        >
                            ← Back to
                            Work
                        </Link>
                    </div>


                    <div className="case-study-hero">
                        <div className="case-study-hero-copy">
                            <div className="case-study-label-row">
                                <p className="eyebrow">
                                    Deep Dive
                                </p>

                                {project.status && (
                                    <span className="mockup-card-badge mockup-card-badge-status">
                                        {
                                            project.status
                                        }
                                    </span>
                                )}
                            </div>

                            <h1 id="case-study-title">
                                {
                                    project.title
                                }
                            </h1>

                            <p className="case-study-subtitle">
                                {project.subtitle ||
                                    project.type}
                            </p>

                            <p className="case-study-summary">
                                {project.shortValue ||
                                    project.summary}
                            </p>
                        </div>


                        <ProjectMedia
                            media={
                                project.media
                            }
                            projectTitle={
                                project.title
                            }
                            variant="detail"
                        />
                    </div>


                    <div
                        className="case-study-meta-row"
                        aria-label="Project metadata"
                    >
                        <div>
                            <span>
                                Role
                            </span>

                            <strong>
                                {project.role ||
                                    "Not specified"}
                            </strong>
                        </div>

                        <div>
                            <span>
                                Audience
                            </span>

                            <strong>
                                {project.audience ||
                                    "Not specified"}
                            </strong>
                        </div>

                        <div>
                            <span>
                                Status
                            </span>

                            <strong>
                                {project.status ||
                                    "Not specified"}
                            </strong>
                        </div>
                    </div>


                    <div
                        className="case-study-tabs"
                        role="tablist"
                        aria-label="Case study sections"
                    >
                        {detailTabs.map(
                            (
                                tab
                            ) => (
                                <button
                                    className={
                                        activeTab ===
                                            tab.id
                                            ? "case-study-tab case-study-tab-active"
                                            : "case-study-tab"
                                    }
                                    type="button"
                                    role="tab"
                                    aria-selected={
                                        activeTab ===
                                        tab.id
                                    }
                                    key={
                                        tab.id
                                    }
                                    onClick={() =>
                                        setActiveTab(
                                            tab.id
                                        )
                                    }
                                >
                                    {
                                        tab.label
                                    }
                                </button>
                            )
                        )}
                    </div>
                </section>


                <section
                    className="home-section case-study-main-section"
                    aria-labelledby="case-study-content-title"
                >
                    <div className="case-study-content-grid">
                        <article className="case-study-main-card">
                            <p className="eyebrow">
                                {
                                    tabContent.eyebrow
                                }
                            </p>

                            <h2 id="case-study-content-title">
                                {
                                    tabContent.title
                                }
                            </h2>


                            <div className="case-study-section-block">
                                <p className="project-section-label">
                                    {
                                        tabContent.problemTitle
                                    }
                                </p>

                                <p>
                                    {
                                        tabContent.problemText
                                    }
                                </p>
                            </div>


                            <div className="case-study-section-block">
                                <p className="project-section-label">
                                    {
                                        tabContent.solutionTitle
                                    }
                                </p>

                                {
                                    tabContent.solutionContent
                                }
                            </div>


                            <div className="case-study-section-block">
                                <p className="project-section-label">
                                    {
                                        tabContent.impactTitle
                                    }
                                </p>

                                {
                                    tabContent.impactContent
                                }
                            </div>
                        </article>


                        <aside
                            className="case-study-sidebar"
                            aria-label="Key highlights"
                        >
                            <p className="project-section-label">
                                Key Highlights
                            </p>

                            {highlights
                                .slice(
                                    0,
                                    3
                                )
                                .map(
                                    (
                                        highlight
                                    ) => (
                                        <div
                                            className="case-study-highlight-card"
                                            key={
                                                highlight
                                            }
                                        >
                                            <p>
                                                {
                                                    highlight
                                                }
                                            </p>
                                        </div>
                                    )
                                )}


                            {(liveUrl ||
                                githubUrl) && (
                                    <div className="case-study-link-stack">
                                        {liveUrl && (
                                            <a
                                                href={
                                                    liveUrl
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Live Demo
                                            </a>
                                        )}

                                        {githubUrl && (
                                            <a
                                                href={
                                                    githubUrl
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                GitHub Repo
                                            </a>
                                        )}
                                    </div>
                                )}
                        </aside>
                    </div>
                </section>


                <section
                    className="home-section case-study-support-section"
                    aria-labelledby="tech-stack-title"
                >
                    <div className="case-study-support-grid">
                        <article className="case-study-support-card">
                            <p className="eyebrow">
                                Tech Stack
                            </p>

                            <h2 id="tech-stack-title">
                                Tools and
                                technical
                                signals.
                            </h2>

                            <div className="mockup-tool-row">
                                {tools.map(
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
                        </article>


                        <article className="case-study-support-card">
                            <p className="eyebrow">
                                Takeaways
                            </p>

                            <h2>
                                What this
                                project
                                taught me.
                            </h2>

                            {renderList(
                                takeaways,
                                "Takeaways will be added as this project develops."
                            )}
                        </article>


                        <article className="case-study-support-card">
                            <p className="eyebrow">
                                Future Work
                            </p>

                            <h2>
                                What I
                                would
                                improve
                                next.
                            </h2>

                            {renderList(
                                futureWork,
                                "Future work will be added as this project develops."
                            )}
                        </article>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}


export default ProjectDetails;