const expertiseItems = [
    {
        title: "Product Thinking",
        description: "Problem framing & prioritization",
        symbol: "01",
    },
    {
        title: "UX / UI Design",
        description: "User flows & interface design",
        symbol: "02",
    },
    {
        title: "Engineering",
        description: "Full-stack development",
        symbol: "03",
    },
    {
        title: "Systems Thinking",
        description: "Data flow & dependencies",
        symbol: "04",
    },
];

function SkillsPanel() {
    return (
        <section className="expertise-strip" aria-label="Core expertise">
            {expertiseItems.map((item) => (
                <article className="expertise-strip-item" key={item.title}>
                    <span>{item.symbol}</span>
                    <div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                </article>
            ))}
        </section>
    );
}

export default SkillsPanel;