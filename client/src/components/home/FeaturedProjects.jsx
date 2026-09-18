import { Link } from "react-router-dom";

import usePublicProjects from "../../hooks/usePublicProjects";
import ProjectGrid from "../projects/ProjectGrid";


function FeaturedProjects() {
    const {
        projects,
        isLoading,
        error,
        reload,
    } = usePublicProjects();


    const featuredProjects = [
        ...projects,
    ]
        .filter(
            (project) =>
                project.featured
        )
        .sort(
            (
                firstProject,
                secondProject
            ) =>
                Number(
                    firstProject.order ??
                    999
                ) -
                Number(
                    secondProject.order ??
                    999
                )
        )
        .slice(
            0,
            2
        );


    return (
        <section
            className="home-section selected-work-section"
            id="projects"
            aria-labelledby="selected-work-title"
        >
            <div className="section-heading section-heading-with-action">
                <div>
                    <p className="eyebrow">
                        Selected Work
                    </p>

                    <h2 id="selected-work-title">
                        A handpicked
                        selection of
                        projects,
                        systems, and
                        experiences.
                    </h2>

                    <p>
                        Each card is
                        structured to
                        show what I
                        built, why it
                        matters, and
                        which thinking
                        lenses shaped
                        the work.
                    </p>
                </div>

                <Link
                    className="button button-secondary"
                    to="/projects"
                >
                    View All Work →
                </Link>
            </div>


            {isLoading && (
                <div
                    className="work-project-api-status"
                    role="status"
                    aria-live="polite"
                >
                    <div>
                        <strong>
                            Loading
                            selected
                            work...
                        </strong>

                        <span>
                            Getting the
                            latest
                            published
                            projects.
                        </span>
                    </div>
                </div>
            )}


            {!isLoading &&
                error && (
                    <div
                        className="work-project-api-status work-project-api-status-error"
                        role="alert"
                    >
                        <div>
                            <strong>
                                Selected
                                work is
                                temporarily
                                unavailable.
                            </strong>

                            <span>
                                Please try
                                again.
                            </span>
                        </div>

                        <button
                            className="button button-secondary"
                            type="button"
                            onClick={
                                reload
                            }
                        >
                            Try Again
                        </button>
                    </div>
                )}


            {!isLoading &&
                !error &&
                featuredProjects.length >
                0 && (
                    <ProjectGrid
                        projects={
                            featuredProjects
                        }
                    />
                )}


            {!isLoading &&
                !error &&
                featuredProjects.length ===
                0 && (
                    <div className="work-project-api-status">
                        <div>
                            <strong>
                                No
                                featured
                                projects
                                are
                                published
                                yet.
                            </strong>
                        </div>
                    </div>
                )}
        </section>
    );
}


export default FeaturedProjects;