import { Link } from "react-router-dom";

function getDisplayTypeLabel(displayType) {
    const labels = {
        "case-study": "Case Study",
        experience: "Experience",
        project: "Project",
        leadership: "Leadership",
    };

    return labels[displayType] || "Work";
}

function ProjectCard({ project }) {
    const visibleTools = project.tools.slice(0, 4);
    const visibleLenses = project.thinkingLenses.slice(0, 3);

    return (
        <article className="mockup-work-card" id={project.id}>
            <div className="mockup-work-card-media" aria-hidden="true">
                <div className="mockup-card-browser-bar">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className="mockup-card-screen">
                    <div className="mockup-card-screen-block mockup-card-screen-block-large"></div>
                    <div className="mockup-card-screen-row">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="mockup-card-screen-line"></div>
                    <div className="mockup-card-screen-line short"></div>
                </div>
            </div>

            <div className="mockup-work-card-body">
                <div className="mockup-work-card-header">
                    <span className="mockup-card-badge">{getDisplayTypeLabel(project.displayType)}</span>
                    <span className="mockup-card-badge mockup-card-badge-status">{project.status}</span>
                </div>

                <div>
                    <h3>{project.title}</h3>
                    <p className="mockup-work-card-subtitle">{project.subtitle || project.type}</p>
                </div>

                <p className="mockup-work-card-summary">
                    {project.shortValue || project.summary}
                </p>

                <div className="mockup-lens-row" aria-label="Thinking lenses">
                    {visibleLenses.map((lens) => (
                        <span key={lens}>{lens}</span>
                    ))}
                </div>

                <div className="mockup-tool-row" aria-label="Tools and technologies">
                    {visibleTools.map((tool) => (
                        <span key={tool}>{tool}</span>
                    ))}
                </div>
            </div>

            <div className="mockup-work-card-footer">
                <Link to={`/projects/${project.id}`}>
                    {project.detailCta || "View Case Study"} →
                </Link>

                <div>
                    {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noreferrer">
                            GitHub
                        </a>
                    )}

                    {project.links.live && (
                        <a href={project.links.live} target="_blank" rel="noreferrer">
                            Live
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export default ProjectCard;