const skillGroups = [
    {
        title: "Product",
        description: "Framing problems, prioritizing tradeoffs, and connecting work to user needs.",
        skills: ["Problem Framing", "Prioritization", "User Needs", "Tradeoffs"],
    },
    {
        title: "Design",
        description: "Designing readable, accessible, and responsive interfaces with clear hierarchy.",
        skills: ["UI Design", "UX Flows", "Accessibility", "Responsive Layouts"],
    },
    {
        title: "Engineering",
        description: "Building full-stack features with reusable components, APIs, and database structure.",
        skills: ["React", "Node", "Express", "MongoDB"],
    },
    {
        title: "Systems",
        description: "Thinking through data flow, dependencies, documentation, and iteration loops.",
        skills: ["Data Flow", "APIs", "Documentation", "Iteration"],
    },
];

function SkillsPanel() {
    return (
        <section className="home-section" aria-labelledby="skills-title">
            <div className="section-heading">
                <p className="eyebrow">Thinking Stack</p>
                <h2 id="skills-title">My work connects strategy, interface design, and implementation.</h2>
            </div>

            <div className="skills-grid">
                {skillGroups.map((group) => (
                    <article className="skill-card skill-system-card" key={group.title}>
                        <h3>{group.title}</h3>
                        <p>{group.description}</p>

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