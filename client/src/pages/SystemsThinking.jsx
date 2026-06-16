import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const deepDiveSections = [
    {
        id: "product",
        label: "Product",
        title: "I start by defining the problem before choosing a solution.",
        description:
            "I look at the user need, the goal, the constraints, and the value of the work before jumping into interface design or code.",
        points: [
            "Clarify the user or reviewer goal.",
            "Identify what problem the project is actually solving.",
            "Separate must-have functionality from nice-to-have ideas.",
        ],
    },
    {
        id: "ux-ui",
        label: "UX / UI",
        title: "I shape the experience around clarity and usability.",
        description:
            "I think about how someone moves through the page, what they need to understand first, and how visual hierarchy can reduce confusion.",
        points: [
            "Design for scanability before deep reading.",
            "Use layout, spacing, and labels to guide attention.",
            "Keep forms and navigation predictable and accessible.",
        ],
    },
    {
        id: "engineering",
        label: "Engineering",
        title: "I build the system with data, APIs, and deployment in mind.",
        description:
            "I separate frontend behavior, backend validation, database storage, environment variables, and deployment concerns so the project can grow safely.",
        points: [
            "Use backend validation as the real source of truth.",
            "Keep secrets out of frontend code and GitHub.",
            "Build with reusable components and clear route structure.",
        ],
    },
    {
        id: "systems",
        label: "Systems",
        title: "I connect the parts so the feature works as a complete loop.",
        description:
            "Systems thinking helps me understand how user input, interface states, backend behavior, storage, notifications, admin review, and future iteration affect each other.",
        points: [
            "Map how data moves through the feature.",
            "Identify dependencies and risk points.",
            "Plan what can be improved in later versions.",
        ],
    },
];

const exampleFlows = [
    {
        title: "Contact system flow",
        steps: [
            "Visitor submits a form.",
            "Frontend checks required fields.",
            "Backend validates and saves the message.",
            "MongoDB stores the submission.",
            "Resend sends an email notification.",
            "Admin dashboard supports review and follow-up.",
        ],
    },
    {
        title: "Work page review flow",
        steps: [
            "Visitor chooses a role lens.",
            "Work cards filter by reviewer intent.",
            "Card preview gives a fast summary.",
            "Project detail page explains decisions.",
            "Tabs separate product, design, engineering, and systems thinking.",
        ],
    },
];

const tradeoffCards = [
    {
        title: "Build vs. embed",
        decision: "I built my own contact system instead of using only a third-party form.",
        reason:
            "This gave me stronger full-stack proof and more control over validation, storage, email notifications, and admin review.",
    },
    {
        title: "Public vs. protected data",
        decision: "I kept contact submissions behind protected admin routes.",
        reason:
            "Visitors can submit messages publicly, but message data should only be available through authenticated admin access.",
    },
    {
        title: "Simple now vs. scalable later",
        decision: "I built the smallest safe version first.",
        reason:
            "The contact system works now, while reply history, stronger spam protection, and editable content can be added later.",
    },
];

function SystemsThinking() {
    return (
        <>
            <Navbar />

            <main className="home-page systems-deep-dive-page">
                <section className="home-section deep-dive-hero" aria-labelledby="deep-dive-title">
                    <div className="deep-dive-hero-copy">
                        <Link className="project-back-link" to="/projects">
                            ← Back to Work
                        </Link>

                        <p className="eyebrow">Deep Dive</p>
                        <h1 id="deep-dive-title">How I connect product, design, engineering, and systems thinking.</h1>
                        <p>
                            This page explains how I reason through work before, during, and after building.
                            I use systems thinking to connect user needs, interface decisions, data flow,
                            technical constraints, security, documentation, and iteration.
                        </p>
                    </div>

                    <aside className="deep-dive-summary-card" aria-label="Deep dive summary">
                        <p className="project-section-label">Core idea</p>
                        <p>
                            I do not treat product, design, and engineering as separate tracks.
                            I use them together to understand what should be built, how it should feel,
                            and how it should work.
                        </p>
                    </aside>
                </section>

                <section className="home-section" aria-labelledby="deep-dive-lenses-title">
                    <div className="section-heading">
                        <p className="eyebrow">Thinking Lenses</p>
                        <h2 id="deep-dive-lenses-title">The lenses I use to break down a project.</h2>
                        <p>
                            Each lens helps me catch a different part of the system: the problem,
                            the experience, the implementation, and the full loop around the work.
                        </p>
                    </div>

                    <div className="deep-dive-lens-grid">
                        {deepDiveSections.map((section) => (
                            <article className="deep-dive-lens-card" key={section.id}>
                                <span>{section.label}</span>
                                <h3>{section.title}</h3>
                                <p>{section.description}</p>

                                <ul>
                                    {section.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="home-section" aria-labelledby="deep-dive-flow-title">
                    <div className="section-heading">
                        <p className="eyebrow">System Flows</p>
                        <h2 id="deep-dive-flow-title">How the thinking shows up in real portfolio features.</h2>
                    </div>

                    <div className="deep-dive-flow-grid">
                        {exampleFlows.map((flow) => (
                            <article className="deep-dive-flow-card" key={flow.title}>
                                <h3>{flow.title}</h3>

                                <ol>
                                    {flow.steps.map((step) => (
                                        <li key={step}>{step}</li>
                                    ))}
                                </ol>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="home-section" aria-labelledby="deep-dive-tradeoffs-title">
                    <div className="section-heading">
                        <p className="eyebrow">Tradeoffs</p>
                        <h2 id="deep-dive-tradeoffs-title">The decisions behind the system matter.</h2>
                        <p>
                            A strong project is not only about what was built. It also shows what was
                            delayed, what was protected, and why a specific version was the right next step.
                        </p>
                    </div>

                    <div className="deep-dive-tradeoff-grid">
                        {tradeoffCards.map((tradeoff) => (
                            <article className="deep-dive-tradeoff-card" key={tradeoff.title}>
                                <p className="project-section-label">{tradeoff.title}</p>
                                <h3>{tradeoff.decision}</h3>
                                <p>{tradeoff.reason}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="home-section" aria-labelledby="deep-dive-cta-title">
                    <div className="deep-dive-cta-card">
                        <div>
                            <p className="eyebrow">Related Work</p>
                            <h2 id="deep-dive-cta-title">See this thinking applied to the work itself.</h2>
                            <p>
                                The Work page lets you filter by Product, UX/UI, Engineering, and Systems
                                so you can review my projects through the lens that matters most.
                            </p>
                        </div>

                        <div className="hero-actions">
                            <Link className="button button-primary" to="/projects?lens=systems">
                                View Systems Work →
                            </Link>
                            <Link className="button button-secondary" to="/contact">
                                Let’s Connect
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default SystemsThinking;