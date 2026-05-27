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
                        <h1 id="projects-page-title">Projects built as connected systems.</h1>
                        <p>
                            Each project is structured to show how I connect systems thinking,
                            design decisions, and technical implementation into a clear product experience.
                        </p>
                    </div>

                    <div className="project-lens-guide" aria-label="Project thinking lens guide">
                        <div>
                            <h2>Systems</h2>
                            <p>Flows, constraints, dependencies, and how the pieces work together.</p>
                        </div>

                        <div>
                            <h2>Design</h2>
                            <p>Usability, readability, accessibility, interaction, and visual hierarchy.</p>
                        </div>

                        <div>
                            <h2>Technical</h2>
                            <p>Architecture, data, APIs, deployment, security, and implementation choices.</p>
                        </div>
                    </div>

                    <ProjectGrid projects={projects} />
                </section>
            </main>
        </>
    );
}

export default Projects;