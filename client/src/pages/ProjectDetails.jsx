import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import projects from "../data/projects";

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

function renderList(items, fallback = "Details will be added as this project develops.") {
    if (!items || items.length === 0) {
        return <p>{fallback}</p>;
    }

    return (
        <ul className="case-study-list">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

function getTabContent(project, activeTab) {
    const caseStudy = project.caseStudy;

    if (activeTab === "product") {
        return {
            eyebrow: "Product Perspective",
            title: "How I framed the problem and made product decisions.",
            problemTitle: "User need",
            problemText: caseStudy.userNeed,
            solutionTitle: "Product decisions",
            solutionContent: renderList(caseStudy.productDecisions),
            impactTitle: "Tradeoffs",
            impactContent: renderList(caseStudy.tradeoffs),
        };
    }

    if (activeTab === "ux-ui") {
        return {
            eyebrow: "UI/UX Perspective",
            title: "How I shaped the experience around clarity and usability.",
            problemTitle: "Design challenge",
            problemText: project.problem,
            solutionTitle: "Design decisions",
            solutionContent: renderList(caseStudy.designDecisions),
            impactTitle: "Experience impact",
            impactContent: <p>{project.impact}</p>,
        };
    }

    if (activeTab === "engineering") {
        return {
            eyebrow: "Engineering Perspective",
            title: "How I approached the technical architecture.",
            problemTitle: "Technical challenge",
            problemText: project.problem,
            solutionTitle: "Engineering decisions",
            solutionContent: renderList(caseStudy.engineeringDecisions),
            impactTitle: "Technical outcome",
            impactContent: <p>{project.cardOutcome || project.impact}</p>,
        };
    }

    return {
        eyebrow: "Overview",
        title: "How the project comes together.",
        problemTitle: "The problem",
        problemText: project.problem,
        solutionTitle: "The solution",
        solutionContent: <p>{project.solution}</p>,
        impactTitle: "Impact",
        impactContent: <p>{project.impact}</p>,
    };
}

function ProjectDetails() {
    const { projectId } = useParams();
    const [activeTab, setActiveTab] = useState("overview");

    const project = projects.find((currentProject) => currentProject.id === projectId);

    if (!project) {
        return (
            <>
                <Navbar />

                <main className="home-page">
                    <section className="content-card">
                        <p className="eyebrow">Project Not Found</p>
                        <h1>This work item does not exist yet.</h1>
                        <p>The link may be incorrect or the work item may not be available.</p>
                        <Link className="button button-primary" to="/projects">
                            Back to Work
                        </Link>
                    </section>
                </main>
            </>
        );
    }

    const tabContent = getTabContent(project, activeTab);
    const caseStudy = project.caseStudy;
    const highlights = project.proofPoints || [];
    const takeaways = caseStudy.tradeoffs || [];
    const futureWork = caseStudy.nextSteps || [];

    return (
        <>
            <Navbar />

            <main className="home-page case-study-page">
                <section className="home-section case-study-hero-section" aria-labelledby="case-study-title">
                    <div className="case-study-back-row">
                        <Link className="project-back-link" to="/projects">
                            ← Back to Work
                        </Link>
                    </div>

                    <div className="case-study-hero">
                        <div className="case-study-hero-copy">
                            <div className="case-study-label-row">
                                <p className="eyebrow">Deep Dive</p>
                                <span className="mockup-card-badge mockup-card-badge-status">
                                    {project.status}
                                </span>
                            </div>

                            <h1 id="case-study-title">{project.title}</h1>
                            <p className="case-study-subtitle">{project.subtitle || project.type}</p>
                            <p className="case-study-summary">
                                {project.shortValue || project.summary}
                            </p>
                        </div>

                        <div className="case-study-visual-placeholder" aria-label="Project visual placeholder">
                            <div className="mockup-card-browser-bar">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div className="case-study-visual-screen">
                                <div></div>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>

                    <div className="case-study-meta-row" aria-label="Project metadata">
                        <div>
                            <span>Role</span>
                            <strong>{project.role}</strong>
                        </div>

                        <div>
                            <span>Team</span>
                            <strong>1 Engineer, Solo Build</strong>
                        </div>

                        <div>
                            <span>Status</span>
                            <strong>{project.status}</strong>
                        </div>
                    </div>

                    <div className="case-study-tabs" role="tablist" aria-label="Case study sections">
                        {detailTabs.map((tab) => (
                            <button
                                className={
                                    activeTab === tab.id
                                        ? "case-study-tab case-study-tab-active"
                                        : "case-study-tab"
                                }
                                type="button"
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="home-section case-study-main-section" aria-labelledby="case-study-content-title">
                    <div className="case-study-content-grid">
                        <article className="case-study-main-card">
                            <p className="eyebrow">{tabContent.eyebrow}</p>
                            <h2 id="case-study-content-title">{tabContent.title}</h2>

                            <div className="case-study-section-block">
                                <p className="project-section-label">{tabContent.problemTitle}</p>
                                <p>{tabContent.problemText}</p>
                            </div>

                            <div className="case-study-section-block">
                                <p className="project-section-label">{tabContent.solutionTitle}</p>
                                {tabContent.solutionContent}
                            </div>

                            <div className="case-study-section-block">
                                <p className="project-section-label">{tabContent.impactTitle}</p>
                                {tabContent.impactContent}
                            </div>
                        </article>

                        <aside className="case-study-sidebar" aria-label="Key highlights">
                            <p className="project-section-label">Key Highlights</p>

                            {highlights.slice(0, 3).map((highlight) => (
                                <div className="case-study-highlight-card" key={highlight}>
                                    <p>{highlight}</p>
                                </div>
                            ))}

                            <div className="case-study-link-stack">
                                {project.links.live && (
                                    <a href={project.links.live} target="_blank" rel="noreferrer">
                                        Live Demo
                                    </a>
                                )}

                                {project.links.github && (
                                    <a href={project.links.github} target="_blank" rel="noreferrer">
                                        GitHub Repo
                                    </a>
                                )}
                            </div>
                        </aside>
                    </div>
                </section>

                <section className="home-section case-study-support-section" aria-labelledby="tech-stack-title">
                    <div className="case-study-support-grid">
                        <article className="case-study-support-card">
                            <p className="eyebrow">Tech Stack</p>
                            <h2 id="tech-stack-title">Tools and technical signals.</h2>

                            <div className="mockup-tool-row">
                                {project.tools.map((tool) => (
                                    <span key={tool}>{tool}</span>
                                ))}
                            </div>
                        </article>

                        <article className="case-study-support-card">
                            <p className="eyebrow">Takeaways</p>
                            <h2>What this project taught me.</h2>
                            {renderList(takeaways, "Takeaways will be added as this project develops.")}
                        </article>

                        <article className="case-study-support-card">
                            <p className="eyebrow">Future Work</p>
                            <h2>What I would improve next.</h2>
                            {renderList(futureWork, "Future work will be added as this project develops.")}
                        </article>
                    </div>
                </section>
            </main>
        </>
    );
}

export default ProjectDetails;