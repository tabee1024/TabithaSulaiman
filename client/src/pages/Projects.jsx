import Navbar from "../components/layout/Navbar";
import projects from "../data/projects";
import ProjectGrid from "../components/projects/ProjectGrid";

function Projects() {
  return (
    <>
      <Navbar />

      <main className="home-page">
        <section className="home-section" aria-labelledby="projects-page-title">
          <div className="section-heading">
            <p className="eyebrow">Projects</p>
            <h1 id="projects-page-title">Projects built with product, design, and engineering in mind.</h1>
            <p>
              This page collects my project work in one place. Each project is structured to show
              what I built, why I built it, and how I approached the decisions behind it.
            </p>
          </div>

          <ProjectGrid projects={projects} />
        </section>
      </main>
    </>
  );
}

export default Projects;