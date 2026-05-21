import { featuredProjects } from "../../data/projects";
import ProjectGrid from "../projects/ProjectGrid";

function FeaturedProjects() {
  return (
    <section className="home-section" id="projects" aria-labelledby="projects-title">
      <div className="section-heading">
        <p className="eyebrow">Featured Projects</p>
        <h2 id="projects-title">Selected work that connects product, design, and engineering.</h2>
      </div>

      <ProjectGrid projects={featuredProjects} />
    </section>
  );
}

export default FeaturedProjects;