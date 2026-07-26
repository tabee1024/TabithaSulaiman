import { Link } from "react-router-dom";

const principles = [
    {
        number: "01",
        title: "Readable",
        description: "I create clear hierarchy so people can scan before going deeper.",
    },
    {
        number: "02",
        title: "Useful",
        description: "I explain what I built, why it matters, and how the system works.",
    },
    {
        number: "03",
        title: "Secure",
        description: "I protect secrets, visitor data, and private admin workflows.",
    },
];

function AboutPreview() {
    return (
        <section
            className="home-section home-about-preview"
            aria-labelledby="about-preview-title"
        >
            <div className="home-about-preview-grid">
                <div className="home-about-preview-copy">
                    <p className="eyebrow">About Me</p>

                    <h2 id="about-preview-title">
                        I build with product, design, and engineering in the same conversation.
                    </h2>

                    <p>
                        I am a Computer Science graduate whose work connects product thinking,
                        UX/UI design, software engineering, and systems thinking.
                    </p>

                    <p>
                        I use this portfolio to show both the final work and the decisions,
                        tradeoffs, and technical structure behind it.
                    </p>

                    <Link className="button button-secondary" to="/about">
                        More About Me →
                    </Link>
                </div>

                <div className="about-preview-principles" aria-label="Working principles">
                    {principles.map((principle) => (
                        <article className="about-preview-principle" key={principle.title}>
                            <span>{principle.number}</span>

                            <div>
                                <h3>{principle.title}</h3>
                                <p>{principle.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AboutPreview;