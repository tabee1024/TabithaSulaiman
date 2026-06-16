import { Link } from "react-router-dom";
import { featuredProjects } from "../../data/projects";
import ProjectGrid from "../projects/ProjectGrid";

function FeaturedProjects() {
    return (
        <section className="home-section selected-work-section" id="projects" aria-labelledby="selected-work-title">
            <div className="section-heading section-heading-with-action">
                <div>
                    <p className="eyebrow">Selected Work</p>
                    <h2 id="selected-work-title">A handpicked selection of projects, systems, and experiences.</h2>
                    <p>
                        Each card is structured to show what I built, why it matters,
                        and which thinking lenses shaped the work.
                    </p>
                </div>

                <Link className="button button-secondary" to="/projects">
                    View All Work →
                </Link>
            </div>

            <ProjectGrid projects={featuredProjects} />
        </section>
    );
}

export default FeaturedProjects;