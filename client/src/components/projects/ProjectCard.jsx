function ProjectCard({ project }) {
  return (
    <article className="project-card" id={project.id}>
      <div className="project-card-header">
        <p className="project-type">{project.type}</p>
        <span className="project-status">{project.status}</span>
      </div>

      <h3>{project.title}</h3>

      <p className="project-role">{project.role}</p>

      <p className="project-summary">{project.summary}</p>

      <div className="project-section">
        <h4>Audience</h4>
        <p>{project.audience}</p>
      </div>

      <div className="project-section">
        <h4>Impact</h4>
        <p>{project.impact}</p>
      </div>

      <div className="project-section">
        <h4>Tools</h4>
        <div className="skill-tags">
          {project.tools.map((tool) => (
            <span className="skill-tag" key={tool}>
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="project-section">
        <h4>Skills</h4>
        <div className="skill-tags">
          {project.skills.map((skill) => (
            <span className="skill-tag" key={skill}>
              {skill}
            </span>
          ))}
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

        <a href={`#${project.id}`}>View Details</a>
      </div>
    </article>
  );
}

export default ProjectCard;