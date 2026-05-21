function AboutPreview() {
    return (
        <section className="home-section" id="about" aria-labelledby="about-title">
            <div className="section-heading">
                <p className="eyebrow">About Me</p>
                <h2 id="about-title">I build with product, design, and engineering in the same conversation.</h2>
            </div>

            <div className="content-card">
                <p>
                    I am a 2026 Computer Science graduate from California State University, Northridge.
                    My work sits at the intersection of product thinking, UI/UX design, and software
                    engineering.
                </p>

                <p>
                    I use this portfolio to document not only what I build, but how I make decisions,
                    define tradeoffs, structure systems, and design experiences that are easier to use.
                </p>
            </div>
        </section>
    );
}

export default AboutPreview;