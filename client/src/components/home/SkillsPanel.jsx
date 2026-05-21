const skillGroups = [
    {
        title: "Product",
        skills: ["Problem Framing", "Prioritization", "User Needs", "Tradeoffs"],
    },
    {
        title: "Design",
        skills: ["UI Design", "UX Flows", "Accessibility", "Responsive Layouts"],
    },
    {
        title: "Engineering",
        skills: ["React", "Node", "Express", "MongoDB"],
    },
    {
        title: "Systems",
        skills: ["Data Flow", "APIs", "Documentation", "Iteration"],
    },
];

function SkillsPanel() {
    return (
        <section className="home-section" aria-labelledby="skills-title">
            <div className="section-heading">
                <p className="eyebrow">Skills</p>
                <h2 id="skills-title">My work connects strategy, interface design, and implementation.</h2>
            </div>

            <div className="skills-grid">
                {skillGroups.map((group) => (
                    <article className="skill-card" key={group.title}>
                        <h3>{group.title}</h3>

                        <div className="skill-tags">
                            {group.skills.map((skill) => (
                                <span className="skill-tag" key={skill}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default SkillsPanel;