import { Link } from "react-router-dom";

const heroSignals = [
    "Systems Thinking",
    "UI/UX Design",
    "Full-Stack Engineering",
];

const heroSystemItems = [
    {
        number: "01",
        label: "Product",
        description: "I frame the problem before designing the interface.",
    },
    {
        number: "02",
        label: "Design",
        description: "I shape flows, hierarchy, and usability around real context.",
    },
    {
        number: "03",
        label: "Engineering",
        description: "I build the system with data, APIs, deployment, and security in mind.",
    },
];

function Hero() {
    return (
        <section className="hero-section hero-system-section" aria-labelledby="hero-title">
            <div className="hero-copy-block hero-system-card">
                <div className="hero-meta-row">
                    <p className="eyebrow">Portfolio OS</p>
                    <p className="hero-version">v2.4 / Live Build</p>
                </div>

                <h1 id="hero-title">Designing systems. Building impact.</h1>

                <p className="hero-tagline">
                    I’m Tabitha Sulaiman, a product-minded full-stack builder connecting UX, systems, and engineering.
                </p>

                <p className="hero-description">
                    My portfolio documents how I define problems, design usable interfaces, build full-stack features,
                    and make responsible technical decisions across real project workflows.
                </p>

                <div className="hero-signal-row" aria-label="Portfolio focus areas">
                    {heroSignals.map((signal) => (
                        <span className="hero-signal" key={signal}>
                            {signal}
                        </span>
                    ))}
                </div>

                <div className="hero-actions" aria-label="Primary actions">
                    <Link to="/projects" className="button button-primary">
                        View Projects
                    </Link>
                    <Link to="/systems-thinking" className="button button-secondary">
                        See My Approach
                    </Link>
                </div>
            </div>

            <aside className="hero-system-panel" aria-label="Portfolio system summary">
                {heroSystemItems.map((item) => (
                    <div key={item.number}>
                        <span>{item.number}</span>
                        <h2>{item.label}</h2>
                        <p>{item.description}</p>
                    </div>
                ))}
            </aside>
        </section>
    );
}

export default Hero;