function Hero() {
    return (
        <section className="hero-section" aria-labelledby="hero-title">
            <div className="hero-copy-block">
                <p className="eyebrow">Hi, I am</p>

                <h1 id="hero-title">
                    Tabitha Sulaiman
                </h1>

                <p className="hero-tagline">
                    Product-minded full-stack builder designing useful, human-centered systems.
                </p>

                <p className="hero-description">
                    I combine product thinking, UX design, and full-stack development to build digital
                    experiences that are clear, useful, and thoughtfully structured.
                </p>

                <div className="hero-actions" aria-label="Primary actions">
                    <a href="#projects" className="button button-primary">
                        View Projects
                    </a>
                    <a href="#systems" className="button button-secondary">
                        See My Approach
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Hero;