import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
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

            <main className="home-page">
                <section className="home-section">
                    <div className="section-heading">
                        <p className="eyebrow">{project.type}</p>
                        <h1>{project.title}</h1>
                        <p>{project.summary}</p>
                    </div>

                    <div className="content-card project-detail-card">
                        <p>
                            <strong>Role:</strong> {project.role}
                        </p>
                        <p>
                            <strong>Status:</strong> {project.status}
                        </p>
                        <p>
                            <strong>Audience:</strong> {project.audience}
                        </p>

                        <h2>Problem</h2>
                        <p>{project.problem}</p>

                        <h2>Solution</h2>
                        <p>{project.solution}</p>

                        <h2>Impact</h2>
                        <p>{project.impact}</p>

                        <h2>Tools</h2>
                        <div className="skill-tags">
                            {project.tools.map((tool) => (
                                <span className="skill-tag" key={tool}>
                                    {tool}
                                </span>
                            ))}
                        </div>

                        <h2>Skills</h2>
                        <div className="skill-tags">
                            {project.skills.map((skill) => (
                                <span className="skill-tag" key={skill}>
                                    {skill}
                                </span>
                            ))}
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
                </section>
            </main>
        </>
    );
}

export default ProjectDetails;