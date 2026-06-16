import ProjectCard from "./ProjectCard";

function ProjectGrid({ projects, emptyMessage = "No work found for those filters." }) {
    if (projects.length === 0) {
        return (
            <div className="project-empty-state">
                <h2>No matching work found.</h2>
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="mockup-work-grid">
            {projects.map((project) => (
                <ProjectCard project={project} key={project.id} />
            ))}
        </div>
    );
}

export default ProjectGrid;