import projects from "../../data/projects";
import ProjectCard from "../projects/ProjectCard";

function FeaturedProjects() {
  return (
    <section className="home-section" id="projects" aria-labelledby="projects-title">
      <div className="section-heading">
        <p className="eyebrow">Featured Projects</p>
        <h2 id="projects-title">Selected work that connects product, design, and engineering.</h2>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProjects;