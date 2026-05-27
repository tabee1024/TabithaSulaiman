import { Link } from "react-router-dom";

function formatProjectNumber(projectNumber) {
    return String(projectNumber).padStart(2, "0");
}

function ProjectCard({ project, projectNumber }) {
    return (
        <article className="project-card project-intelligence-card" id={project.id}>
            <div className="project-card-system-bar">
                <span className="project-card-number">
                    {formatProjectNumber(projectNumber)}
                </span>

                <div className="project-card-topline">
                    <p className="project-type">{project.type}</p>
                    <span className="project-status">{project.status}</span>
                </div>
            </div>

            <div className="project-card-title-block">
                <h3>{project.title}</h3>
                <p className="project-role">{project.role}</p>
            </div>

            <p className="project-summary">{project.summary}</p>

            <div className="project-card-module">
                <p className="project-section-label">Thinking Lens</p>
                <div className="thinking-lens-row" aria-label="Thinking lenses">
                    {project.thinkingLenses.map((lens) => (
                        <span className="thinking-lens" key={lens}>
                            {lens}
                        </span>
                    ))}
                </div>
            </div>

            <div className="project-outcome-panel">
                <p className="project-section-label">Outcome</p>
                <p>{project.cardOutcome}</p>
            </div>

            <div className="project-stat-grid" aria-label="Project snapshot">
                {project.impactStats.map((stat) => (
                    <div className="project-stat" key={`${stat.label}-${stat.value}`}>
                        <span>{stat.label}</span>
                        <strong>{stat.value}</strong>
                    </div>
                ))}
            </div>

            <div className="project-card-module">
                <p className="project-section-label">Signal Tags</p>
                <div className="project-tag-row" aria-label="Project tags">
                    {project.cardTags.map((tag) => (
                        <span className="project-tag" key={tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="project-actions project-card-actions">
                <Link to={`/projects/${project.id}`}>
                    {project.detailCta || "View Details"}
                </Link>

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
        </article>
    );
}

export default ProjectCard;