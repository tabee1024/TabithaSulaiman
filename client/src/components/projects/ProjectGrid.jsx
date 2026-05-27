import ProjectCard from "./ProjectCard";

function ProjectGrid({ projects }) {
    return (
        <div className="project-grid project-intelligence-grid">
            {projects.map((project, index) => (
                <ProjectCard project={project} projectNumber={index + 1} key={project.id} />
            ))}
        </div>
    );
}

export default ProjectGrid;