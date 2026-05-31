import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const systemsPillars = [
    {
        id: "workflow-mapping",
        title: "Workflow Mapping",
        eyebrow: "01",
        description:
            "I map how people move through a process before deciding what screens, data, or features are needed.",
        examples: [
            "Clarify the user goal",
            "Identify friction points",
            "Define required actions",
        ],
    },
    {
        id: "data-flow",
        title: "Data Flow",
        eyebrow: "02",
        description:
            "I think through where data starts, how it moves, where it is stored, and who should be allowed to access it.",
        examples: [
            "Frontend input",
            "Backend validation",
            "Database storage",
            "Protected admin review",
        ],
    },
    {
        id: "tradeoffs",
        title: "Tradeoffs",
        eyebrow: "03",
        description:
            "I compare options based on user value, build complexity, maintainability, security, and timing.",
        examples: [
            "Build now vs. later",
            "Simple MVP vs. scalable system",
            "Frontend convenience vs. backend security",
        ],
    },
    {
        id: "iteration-loops",
        title: "Iteration Loops",
        eyebrow: "04",
        description:
            "I plan how a feature can improve after launch through testing, feedback, documentation, and future refinements.",
        examples: [
            "QA checkpoints",
            "Admin feedback",
            "Error states",
            "Future refactors",
        ],
    },
];

const systemsExamples = [
    {
        title: "Portfolio contact system",
        description:
            "The contact flow connects a visitor-facing form, frontend validation, backend validation, MongoDB storage, Resend notifications, and protected admin review.",
    },
    {
        title: "Work page filtering",
        description:
            "The Work page organizes projects by type and thinking lens so visitors can find the proof that matches what they are reviewing.",
    },
    {
        title: "Admin message management",
        description:
            "The admin dashboard separates public submission behavior from protected message review, read status, archive status, and private notes.",
    },
];

const tradeoffCards = [
    {
        decision: "Relative API routes",
        chosen: "Use /api routes with Vercel rewrites",
        why:
            "This keeps frontend code clean and lets the deployed site feel like one website even though the frontend and backend are hosted separately.",
    },
    {
        decision: "Protected admin access",
        chosen: "Use backend auth and httpOnly cookie behavior",
        why:
            "Admin message data should not be exposed through public routes or stored in frontend-only state.",
    },
    {
        decision: "Small safe versions first",
        chosen: "Build contact submission before admin replies",
        why:
            "The smallest safe version makes the system useful before adding more powerful email and messaging actions.",
    },
];

function SystemsThinking() {
    return (
        <>
            <Navbar />

            <main className="home-page systems-page">
                <section className="home-section systems-hero" aria-labelledby="systems-title">
                    <div className="section-heading">
                        <p className="eyebrow">Systems Thinking</p>
                        <h1 id="systems-title">
                            I connect user needs, interface decisions, data flow, and technical constraints.
                        </h1>
                        <p>
                            Systems thinking is how I understand the full path around a feature before deciding
                            what to design, build, test, or improve next.
                        </p>
                    </div>

                    <div className="systems-definition-card">
                        <p className="project-section-label">Working definition</p>
                        <p>
                            Systems thinking means looking at how the parts of a product affect each other:
                            users, workflows, interface states, data, APIs, security, deployment, documentation,
                            and future iteration.
                        </p>
                    </div>
                </section>

                <section className="home-section" aria-labelledby="systems-stack-title">
                    <div className="section-heading">
                        <p className="eyebrow">Thinking Stack</p>
                        <h2 id="systems-stack-title">How I break down a system.</h2>
                        <p>
                            I use these four lenses to move from problem framing to implementation without
                            losing sight of usability, maintainability, or risk.
                        </p>
                    </div>

                    <div className="systems-pillar-grid">
                        {systemsPillars.map((pillar) => (
                            <article className="systems-pillar-card" key={pillar.id}>
                                <span className="systems-pillar-number">{pillar.eyebrow}</span>
                                <h3>{pillar.title}</h3>
                                <p>{pillar.description}</p>

                                <ul>
                                    {pillar.examples.map((example) => (
                                        <li key={example}>{example}</li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="home-section" aria-labelledby="systems-examples-title">
                    <div className="section-heading">
                        <p className="eyebrow">Applied Examples</p>
                        <h2 id="systems-examples-title">Where systems thinking shows up in my portfolio.</h2>
                    </div>

                    <div className="systems-example-grid">
                        {systemsExamples.map((example) => (
                            <article className="systems-example-card" key={example.title}>
                                <h3>{example.title}</h3>
                                <p>{example.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="home-section" aria-labelledby="tradeoffs-title">
                    <div className="section-heading">
                        <p className="eyebrow">Tradeoffs</p>
                        <h2 id="tradeoffs-title">The decisions behind the system matter.</h2>
                        <p>
                            A portfolio can show more than final screens. It can show how decisions were made,
                            what was delayed, and why the chosen version was the right next step.
                        </p>
                    </div>

                    <div className="systems-tradeoff-grid">
                        {tradeoffCards.map((tradeoff) => (
                            <article className="systems-tradeoff-card" key={tradeoff.decision}>
                                <p className="project-section-label">{tradeoff.decision}</p>
                                <h3>{tradeoff.chosen}</h3>
                                <p>{tradeoff.why}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="home-section systems-cta-section" aria-labelledby="systems-cta-title">
                    <div className="content-card systems-cta-card">
                        <p className="eyebrow">Related Work</p>
                        <h2 id="systems-cta-title">See how this thinking appears in the work itself.</h2>
                        <p>
                            The Work page lets you filter projects by Product, UX/UI, Engineering, and Systems
                            so you can review the proof from the lens that matters most.
                        </p>

                        <div className="hero-actions">
                            <Link className="button button-primary" to="/projects?lens=systems">
                                View Systems Work
                            </Link>
                            <Link className="button button-secondary" to="/contact">
                                Let&apos;s Connect
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default SystemsThinking;