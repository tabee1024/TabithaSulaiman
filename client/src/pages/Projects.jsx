import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

function getValidLens(searchValue) {
    const validLensValues = roleLensFilters.map((filter) => filter.value);

    if (validLensValues.includes(searchValue)) {
        return searchValue;
    }

    return "all";
}

function Projects() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialLens = getValidLens(searchParams.get("lens"));

    const [primaryType, setPrimaryType] = useState("all");
    const [roleLens, setRoleLens] = useState(initialLens);
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

    function handleLensChange(nextLens) {
        setRoleLens(nextLens);

        if (nextLens === "all") {
            searchParams.delete("lens");
            setSearchParams(searchParams);
            return;
        }

        setSearchParams({ lens: nextLens });
    }

    function clearFilters() {
        setPrimaryType("all");
        setRoleLens("all");
        setSortBy("newest");
        setSearchParams({});
    }

    return (
        <>
            <Navbar />

            <main className="home-page projects-page work-mockup-page">
                <section className="home-section work-hero-section" aria-labelledby="projects-page-title">
                    <div className="work-page-header">
                        <div>
                            <p className="eyebrow">Work</p>
                            <h1 id="projects-page-title">Work</h1>
                            <p>
                                Explore all my work or filter by what matters most to you.
                            </p>
                        </div>

                        <div className="work-page-note" aria-label="Work page guidance">
                            <p>
                                Browse by work type, role lens, and technical signal to quickly
                                find the proof that matches what you are reviewing.
                            </p>
                        </div>
                    </div>

                    <div className="work-control-board" aria-label="Work filters">
                        <div className="work-control-row">
                            <div>
                                <p className="project-section-label">Work Type</p>
                                <div className="mockup-filter-row">
                                    {primaryFilters.map((filter) => (
                                        <button
                                            className={
                                                primaryType === filter.value
                                                    ? "mockup-filter-button mockup-filter-button-active"
                                                    : "mockup-filter-button"
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

                            <label className="mockup-sort-label">
                                Sort by
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
                        </div>

                        <div>
                            <p className="project-section-label">Role Lens</p>
                            <div className="mockup-filter-row">
                                {roleLensFilters.map((filter) => (
                                    <button
                                        className={
                                            roleLens === filter.value
                                                ? "mockup-filter-button mockup-filter-button-active"
                                                : "mockup-filter-button"
                                        }
                                        type="button"
                                        key={filter.value}
                                        onClick={() => handleLensChange(filter.value)}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="work-control-footer">
                            <p aria-live="polite">
                                Showing <strong>{filteredProjects.length}</strong> of{" "}
                                <strong>{projects.length}</strong> work items.
                            </p>

                            <button className="button button-secondary" type="button" onClick={clearFilters}>
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    <ProjectGrid projects={filteredProjects} />

                    <div className="work-bottom-cta">
                        <div>
                            <p className="eyebrow">Have a project or opportunity?</p>
                            <h2>Let's connect around useful, thoughtful work.</h2>
                        </div>

                        <a className="button button-primary" href="/contact">
                            Let's Connect →
                        </a>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Projects;