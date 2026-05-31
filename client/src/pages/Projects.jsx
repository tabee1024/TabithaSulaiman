import { useMemo, useState } from "react";
import Navbar from "../components/layout/Navbar";
import projects from "../data/projects";
import ProjectGrid from "../components/projects/ProjectGrid";

const primaryFilters = [
    { label: "All", value: "all" },
    { label: "Case Studies", value: "case-study" },
    { label: "Experience", value: "experience" },
    { label: "Projects", value: "project" },
    { label: "Leadership", value: "leadership" },
];

const roleLensFilters = [
    { label: "All", value: "all" },
    { label: "Product", value: "product" },
    { label: "UX / UI", value: "ux-ui" },
    { label: "Engineering", value: "engineering" },
    { label: "Systems", value: "systems" },
];

const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Featured", value: "featured" },
    { label: "A-Z", value: "az" },
];

function Projects() {
    const [primaryType, setPrimaryType] = useState("all");
    const [roleLens, setRoleLens] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    const filteredProjects = useMemo(() => {
        const visibleProjects = projects.filter((project) => {
            const matchesPrimaryType =
                primaryType === "all" || project.displayType === primaryType;

            const matchesRoleLens =
                roleLens === "all" || project.roleLens.includes(roleLens);

            return matchesPrimaryType && matchesRoleLens;
        });

        return [...visibleProjects].sort((firstProject, secondProject) => {
            if (sortBy === "featured") {
                return Number(secondProject.featured) - Number(firstProject.featured);
            }

            if (sortBy === "az") {
                return firstProject.title.localeCompare(secondProject.title);
            }

            if (sortBy === "oldest") {
                return new Date(firstProject.sortDate) - new Date(secondProject.sortDate);
            }

            return new Date(secondProject.sortDate) - new Date(firstProject.sortDate);
        });
    }, [primaryType, roleLens, sortBy]);

    function clearFilters() {
        setPrimaryType("all");
        setRoleLens("all");
        setSortBy("newest");
    }

    return (
        <>
            <Navbar />

            <main className="home-page projects-page">
                <section className="home-section projects-system-section" aria-labelledby="projects-page-title">
                    <div className="projects-board">
                        <div className="projects-board-header">
                            <div className="section-heading">
                                <p className="eyebrow">Work</p>
                                <h1 id="projects-page-title">Work built through product, design, systems, and engineering.</h1>
                                <p>
                                    Explore my work by project type or by the thinking lens that matters most.
                                    Each card is structured to show what I built, why it matters, and how I made decisions.
                                </p>
                            </div>

                            <div className="project-page-summary" aria-label="Work page summary">
                                <p>
                                    Use the filters to find the proof that matches what you are reviewing:
                                    product thinking, UX/UI design, engineering execution, or systems thinking.
                                </p>
                            </div>
                        </div>

                        <div className="work-filter-panel" aria-label="Work filters">
                            <div className="work-filter-group">
                                <p className="project-section-label">Work Type</p>
                                <div className="project-filter-bar">
                                    {primaryFilters.map((filter) => (
                                        <button
                                            className={
                                                primaryType === filter.value
                                                    ? "project-filter project-filter-active"
                                                    : "project-filter"
                                            }
                                            type="button"
                                            key={filter.value}
                                            onClick={() => setPrimaryType(filter.value)}
                                        >
                                            {filter.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="work-filter-group">
                                <p className="project-section-label">Thinking Lens</p>
                                <div className="project-filter-bar">
                                    {roleLensFilters.map((filter) => (
                                        <button
                                            className={
                                                roleLens === filter.value
                                                    ? "project-filter project-filter-active"
                                                    : "project-filter"
                                            }
                                            type="button"
                                            key={filter.value}
                                            onClick={() => setRoleLens(filter.value)}
                                        >
                                            {filter.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="work-filter-footer">
                                <label className="project-sort-label">
                                    Sort
                                    <select
                                        value={sortBy}
                                        onChange={(event) => setSortBy(event.target.value)}
                                    >
                                        {sortOptions.map((option) => (
                                            <option value={option.value} key={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <button className="button button-secondary" type="button" onClick={clearFilters}>
                                    Clear Filters
                                </button>
                            </div>
                        </div>

                        <div className="work-results-summary" aria-live="polite">
                            Showing {filteredProjects.length} of {projects.length} work items.
                        </div>

                        <ProjectGrid projects={filteredProjects} />

                        <div className="project-lens-guide project-lens-guide-footer" aria-label="Project thinking lens guide">
                            <div>
                                <h2>Product</h2>
                                <p>Problem framing, prioritization, tradeoffs, and user value.</p>
                            </div>

                            <div>
                                <h2>UX / UI</h2>
                                <p>Usability, readability, accessibility, interaction, and visual hierarchy.</p>
                            </div>

                            <div>
                                <h2>Engineering</h2>
                                <p>Architecture, data, APIs, deployment, security, and implementation choices.</p>
                            </div>

                            <div>
                                <h2>Systems</h2>
                                <p>Flows, constraints, dependencies, and how the pieces work together.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Projects;