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
        label: "UX / UI",
    },
    {
        id: "engineering",
        label: "Engineering",
    },
    {
        id: "systems",
        label: "Systems",
    },
];

function renderList(items) {
    if (!items || items.length === 0) {
        return <p>Details will be added as this project develops.</p>;
    }

    return (
        <ul className="project-detail-list">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
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

    const caseStudy = project.caseStudy;

    return (
        <>
            <Navbar />

            <main className="home-page project-detail-page">
                <section className="home-section">
                    <Link className="project-back-link" to="/projects">
                        ← Back to Work
                    </Link>

                    <div className="project-detail-hero">
                        <div className="section-heading">
                            <p className="eyebrow">{project.displayType || project.type}</p>
                            <h1>{project.title}</h1>
                            <p>{project.shortValue || project.summary}</p>

                            <div className="thinking-lens-row">
                                {project.thinkingLenses.map((lens) => (
                                    <span className="thinking-lens" key={lens}>
                                        {lens}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <aside className="project-detail-side-panel" aria-label="Project summary">
                            <p className="project-section-label">Project Snapshot</p>

                            <div className="project-detail-side-row">
                                <span>Role</span>
                                <strong>{project.role}</strong>
                            </div>

                            <div className="project-detail-side-row">
                                <span>Status</span>
                                <strong>{project.status}</strong>
                            </div>

                            <div className="project-detail-side-row">
                                <span>Audience</span>
                                <strong>{project.audience}</strong>
                            </div>
                        </aside>
                    </div>

                    <div className="content-card project-detail-card project-overview-card">
                        <div className="project-detail-section-header">
                            <p className="eyebrow">Case Study</p>
                            <h2>Read the project through different thinking lenses.</h2>
                            <p>
                                Use the tabs to explore the project from product, design,
                                engineering, and systems perspectives.
                            </p>
                        </div>

                        <div className="project-detail-tabs" role="tablist" aria-label="Project detail sections">
                            {detailTabs.map((tab) => (
                                <button
                                    className={
                                        activeTab === tab.id
                                            ? "project-detail-tab project-detail-tab-active"
                                            : "project-detail-tab"
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

                        {activeTab === "overview" && (
                            <div className="project-detail-tab-panel">
                                <div className="project-detail-snapshot">
                                    {project.impactStats.map((stat) => (
                                        <div className="project-stat" key={`${stat.label}-${stat.value}`}>
                                            <span>{stat.label}</span>
                                            <strong>{stat.value}</strong>
                                        </div>
                                    ))}
                                </div>

                                <div className="project-detail-story-grid">
                                    <article>
                                        <p className="project-section-label">Problem</p>
                                        <h3>What needed to be solved?</h3>
                                        <p>{project.problem}</p>
                                    </article>

                                    <article>
                                        <p className="project-section-label">Solution</p>
                                        <h3>What did I build or design?</h3>
                                        <p>{project.solution}</p>
                                    </article>

                                    <article>
                                        <p className="project-section-label">Impact</p>
                                        <h3>Why does it matter?</h3>
                                        <p>{project.impact}</p>
                                    </article>
                                </div>

                                <div className="project-detail-text-block">
                                    <h3>Context</h3>
                                    <p>{caseStudy.context}</p>
                                </div>

                                <div className="project-detail-text-block">
                                    <h3>User need</h3>
                                    <p>{caseStudy.userNeed}</p>
                                </div>
                            </div>
                        )}

                        {activeTab === "product" && (
                            <div className="project-detail-tab-panel">
                                <div className="project-detail-text-block">
                                    <h3>Product decisions</h3>
                                    {renderList(caseStudy.productDecisions)}
                                </div>

                                <div className="project-detail-text-block">
                                    <h3>Constraints</h3>
                                    {renderList(caseStudy.constraints)}
                                </div>

                                <div className="project-detail-text-block">
                                    <h3>Tradeoffs</h3>
                                    {renderList(caseStudy.tradeoffs)}
                                </div>
                            </div>
                        )}

                        {activeTab === "ux-ui" && (
                            <div className="project-detail-tab-panel">
                                <div className="project-detail-text-block">
                                    <h3>UX / UI decisions</h3>
                                    {renderList(caseStudy.designDecisions)}
                                </div>

                                <div className="project-detail-text-block">
                                    <h3>Design and product skills</h3>
                                    <div className="skill-tags">
                                        {project.skills.map((skill) => (
                                            <span className="skill-tag" key={skill}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "engineering" && (
                            <div className="project-detail-tab-panel">
                                <div className="project-detail-text-block">
                                    <h3>Engineering decisions</h3>
                                    {renderList(caseStudy.engineeringDecisions)}
                                </div>

                                <div className="project-detail-tool-grid">
                                    <div>
                                        <h3>Tools</h3>
                                        <div className="skill-tags">
                                            {project.tools.map((tool) => (
                                                <span className="skill-tag" key={tool}>
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3>Technical signals</h3>
                                        <div className="skill-tags">
                                            {project.cardTags.map((tag) => (
                                                <span className="skill-tag" key={tag}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "systems" && (
                            <div className="project-detail-tab-panel">
                                <div className="project-detail-text-block">
                                    <h3>Systems thinking</h3>
                                    <p>
                                        This project connects users, interface decisions, data,
                                        backend behavior, deployment, and future iteration into one working system.
                                    </p>
                                </div>

                                <div className="project-detail-text-block">
                                    <h3>Proof points</h3>
                                    {renderList(project.proofPoints)}
                                </div>

                                <div className="project-detail-text-block">
                                    <h3>Next steps</h3>
                                    {renderList(caseStudy.nextSteps)}
                                </div>
                            </div>
                        )}

                        <div className="project-actions">
                            {project.links.github && (
                                <a href={project.links.github} target="_blank" rel="noreferrer">
                                    GitHub
                                </a>
                            )}

                            {project.links.live && (
                                <a href={project.links.live} target="_blank" rel="noreferrer">
                                    Live Demo
                                </a>
                            )}

                            <Link to="/projects">Back to Work</Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default ProjectDetails;