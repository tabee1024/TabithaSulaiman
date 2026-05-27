function AboutPreview() {
    return (
        <section className="home-section" id="about" aria-labelledby="about-title">
            <div className="section-heading">
                <p className="eyebrow">About Me</p>
                <h2 id="about-title">I build with product, design, and engineering in the same conversation.</h2>
            </div>

            <div className="content-card about-system-card">
                <p>
                    I am a 2026 Computer Science graduate from California State University, Northridge.
                    My work sits at the intersection of product thinking, UI/UX design, software
                    engineering, and systems thinking.
                </p>

                <p>
                    I use this portfolio to document not only what I build, but how I make decisions,
                    define tradeoffs, structure systems, and design experiences that are easier to use.
                </p>

                <div className="about-principle-grid" aria-label="Portfolio principles">
                    <div>
                        <h3>Readable</h3>
                        <p>Content should be easy to scan before it asks someone to go deep.</p>
                    </div>

                    <div>
                        <h3>Useful</h3>
                        <p>Each section should explain what I made, why it matters, and how it works.</p>
                    </div>

                    <div>
                        <h3>Secure</h3>
                        <p>Full-stack features should protect secrets, visitor data, and admin workflows.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutPreview;