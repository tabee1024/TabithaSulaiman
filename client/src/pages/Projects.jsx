import Navbar from "../components/layout/Navbar";
import projects from "../data/projects";
import ProjectGrid from "../components/projects/ProjectGrid";

const projectFilters = ["All", "Systems", "Design", "Technical"];

function Projects() {
    return (
        <>
            <Navbar />

            <main className="home-page projects-page">
                <section className="home-section projects-system-section" aria-labelledby="projects-page-title">
                    <div className="projects-board">
                        <div className="projects-board-header">
                            <div className="section-heading">
                                <p className="eyebrow">Projects</p>
                                <h1 id="projects-page-title">Projects built as connected systems.</h1>
                                <p>
                                    Each project is structured to show how I connect systems thinking,
                                    design decisions, and technical implementation into a clear product experience.
                                </p>
                            </div>

                            <div className="project-page-summary" aria-label="Project page summary">
                                <p>
                                    Browse the cards for a quick read, then open a project to see the decisions,
                                    tradeoffs, and implementation details behind the work.
                                </p>
                            </div>
                        </div>

                        <div className="project-filter-bar" aria-label="Project filters">
                            {projectFilters.map((filter, index) => (
                                <button
                                    className={index === 0 ? "project-filter project-filter-active" : "project-filter"}
                                    type="button"
                                    key={filter}
                                >
                                    {filter}
                                </button>
                            ))}

                            <p className="project-sort-label">Sort: Latest →</p>
                        </div>

                        <ProjectGrid projects={projects} />

                        <div className="project-lens-guide project-lens-guide-footer" aria-label="Project thinking lens guide">
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
                    </div>
                </section>
            </main>
        </>
    );
}

export default Projects;