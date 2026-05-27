import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import CaseStudyTemplate from "../components/caseStudies/CaseStudyTemplate";
import projects from "../data/projects";

function ProjectDetails() {
    const { projectId } = useParams();

    const project = projects.find((currentProject) => currentProject.id === projectId);

    if (!project) {
        return (
            <>
                <Navbar />

                <main className="home-page">
                    <section className="content-card">
                        <p className="eyebrow">Project Not Found</p>
                        <h1>This project does not exist yet.</h1>
                        <p>The project link may be incorrect or the project data may not be available.</p>
                        <Link className="button button-primary" to="/projects">
                            Back to Projects
                        </Link>
                    </section>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="home-page project-detail-page">
                <section className="home-section">
                    <div className="project-detail-hero">
                        <div className="section-heading">
                            <Link className="project-back-link" to="/projects">
                                ← Back to Projects
                            </Link>

                            <p className="eyebrow">{project.type}</p>
                            <h1>{project.title}</h1>
                            <p>{project.summary}</p>
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
                            <p className="eyebrow">Overview</p>
                            <h2>How this project comes together.</h2>
                        </div>

                        <div className="thinking-lens-row">
                            {project.thinkingLenses.map((lens) => (
                                <span className="thinking-lens" key={lens}>
                                    {lens}
                                </span>
                            ))}
                        </div>

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

                        <div className="project-detail-tool-grid">
                            <div>
                                <h2>Tools</h2>
                                <div className="skill-tags">
                                    {project.tools.map((tool) => (
                                        <span className="skill-tag" key={tool}>
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2>Skills</h2>
                                <div className="skill-tags">
                                    {project.skills.map((skill) => (
                                        <span className="skill-tag" key={skill}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

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

                            <Link to="/projects">Back to Projects</Link>
                        </div>
                    </div>

                    <div className="project-detail-section-header case-study-intro">
                        <p className="eyebrow">Decision Log</p>
                        <h2>How I reasoned through the work.</h2>
                        <p>
                            This section breaks down the context, constraints, decisions, tradeoffs,
                            and next steps behind the project.
                        </p>
                    </div>

                    <CaseStudyTemplate project={project} />
                </section>
            </main>
        </>
    );
}

export default ProjectDetails;