import { Link } from "react-router-dom";
import portfolioHeadshot from "../../assets/images/portfolioheadshot.png";
import {
    Lightbulb,
    PanelsTopLeft,
    Code2,
    Puzzle,
} from "lucide-react";

const rolePathways = [
    {
        title: "Product",
        description:
            "See problem framing, tradeoffs, metrics, and user value.",
        action: "View Product Work",
        lens: "product",
        icon: Puzzle,
    },
    {
        title: "UX / UI Design",
        description:
            "See research-informed flows, responsive interfaces, and prototypes.",
        action: "View Design Work",
        lens: "design",
        icon: PanelsTopLeft,
    },
    {
        title: "Engineering",
        description:
            "See full-stack builds, APIs, databases, and technical decisions.",
        action: "View Engineering Work",
        lens: "engineering",
        icon: Code2,
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
                {rolePathways.map((role) => {
                    const Icon = role.icon;

                    return (
                        <article className="role-pathway-card" key={role.title}>
                            <div className="role-pathway-symbol" aria-hidden="true">
                                <Icon />
                            </div>

                            <h3>{role.title}</h3>

                            <p>{role.description}</p>

                            <Link to={`/projects?role=${role.lens}`}>
                                {role.action} →
                            </Link>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default RolePathways;