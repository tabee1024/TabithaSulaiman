import ProjectCard from "./ProjectCard";

function ProjectGrid({ projects }) {
    return (
        <div className="project-grid project-intelligence-grid">
            {projects.map((project) => (
                <ProjectCard project={project} key={project.id} />
            ))}
        </div>
    );
}

export default ProjectGrid;