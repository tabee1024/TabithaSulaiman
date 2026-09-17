import ProjectCard from "./ProjectCard";


function ProjectGrid({
    projects = [],
    activeLens = "all",
}) {
    return (
        <div className="mockup-work-grid">
            {projects.map(
                (project) => (
                    <ProjectCard
                        key={
                            project.id
                        }
                        project={
                            project
                        }
                        activeLens={
                            activeLens
                        }
                    />
                )
            )}
        </div>
    );
}


export default ProjectGrid;