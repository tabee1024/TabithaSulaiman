import { Link } from "react-router-dom";

const heroSignals = [
    "Systems Thinking",
    "UI/UX Design",
    "Full-Stack Engineering",
];

function Hero() {
    return (
        <section className="hero-section hero-system-section" aria-labelledby="hero-title">
            <div className="hero-copy-block hero-system-card">
                <div className="hero-meta-row">
                    <p className="eyebrow">Portfolio OS</p>
                    <p className="hero-version">v2.1 / Live Build</p>
                </div>

                <h1 id="hero-title">Tabitha Sulaiman</h1>

                <p className="hero-tagline">
                    Product-minded full-stack builder designing useful, human-centered systems.
                </p>

                <p className="hero-description">
                    I connect systems thinking, UI/UX design, and full-stack engineering to build digital
                    experiences that are clear, usable, and thoughtfully structured.
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
                <div>
                    <span>01</span>
                    <p>Product logic</p>
                </div>
                <div>
                    <span>02</span>
                    <p>Interface design</p>
                </div>
                <div>
                    <span>03</span>
                    <p>Full-stack build</p>
                </div>
            </aside>
        </section>
    );
}

export default Hero;