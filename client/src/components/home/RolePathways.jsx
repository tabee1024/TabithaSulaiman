import { Link } from "react-router-dom";

const rolePathways = [
    {
        title: "Product",
        description: "See problem framing, tradeoffs, metrics, and user value.",
        href: "/projects?lens=product",
        cta: "View Product Work",
        symbol: "01",
    },
    {
        title: "UX / UI Design",
        description: "See research-informed flows, responsive interfaces, and prototypes.",
        href: "/projects?lens=ux-ui",
        cta: "View Design Work",
        symbol: "02",
    },
    {
        title: "Engineering",
        description: "See full-stack builds, APIs, databases, and technical decisions.",
        href: "/projects?lens=engineering",
        cta: "View Engineering Work",
        symbol: "03",
    },
    {
        title: "Systems",
        description: "See data flow, system constraints, documentation, and iteration loops.",
        href: "/projects?lens=systems",
        cta: "View Systems Work",
        symbol: "04",
    },
];

function RolePathways() {
    return (
        <section className="home-section role-pathways-section" id="role-pathways" aria-labelledby="role-pathways-title">
            <div className="section-heading">
                <p className="eyebrow">Explore by Role</p>
                <h2 id="role-pathways-title">Explore my work by what you’re hiring for.</h2>
            </div>

            <div className="role-pathways-grid">
                {rolePathways.map((role) => (
                    <article className="role-pathway-card" key={role.title}>
                        <span className="role-pathway-symbol">{role.symbol}</span>
                        <h3>{role.title}</h3>
                        <p>{role.description}</p>
                        <Link to={role.href}>
                            {role.cta} →
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default RolePathways;