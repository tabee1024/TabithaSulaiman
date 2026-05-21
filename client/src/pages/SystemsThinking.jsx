import Navbar from "../components/layout/Navbar";

const thinkingAreas = [
    {
        title: "Product Thinking",
        description:
            "I start by clarifying the problem, the user need, the goal, and the constraints. This keeps the work focused before design or code begins.",
    },
    {
        title: "UX Thinking",
        description:
            "I look at how someone moves through the experience, what information they need first, and where confusion can be reduced.",
    },
    {
        title: "Engineering Thinking",
        description:
            "I break the system into reusable parts, define data flow, separate responsibilities, and build in checkpoints so the project stays testable.",
    },
    {
        title: "Tradeoff Thinking",
        description:
            "I document what I choose, what I delay, and why. This helps me make decisions based on project goals instead of adding features randomly.",
    },
];

function SystemsThinking() {
    return (
        <>
            <Navbar />

            <main className="home-page">
                <section className="home-section" aria-labelledby="systems-title">
                    <div className="section-heading">
                        <p className="eyebrow">Systems Thinking</p>
                        <h1 id="systems-title">I connect the problem, the interface, and the implementation.</h1>
                        <p>
                            My approach focuses on how decisions affect the full system. I look at users,
                            information flow, design structure, technical constraints, and future maintenance
                            together instead of treating them as separate parts.
                        </p>
                    </div>

                    <div className="systems-grid">
                        {thinkingAreas.map((area) => (
                            <article className="content-card system-card" key={area.title}>
                                <h2>{area.title}</h2>
                                <p>{area.description}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}

export default SystemsThinking;