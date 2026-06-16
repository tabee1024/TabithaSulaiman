import { Link } from "react-router-dom";

// function Hero() {
//     return (
//         <section className="hero-section hero-system-section" aria-labelledby="hero-title">
//             <div className="hero-copy-block hero-system-card">
//                 <div className="hero-meta-row">
//                     <p className="eyebrow">Portfolio OS</p>
//                     <p className="hero-version">v2.4 / Live Build</p>
//                 </div>

//                 <h1 id="hero-title">Designing systems. Building impact.</h1>

//                 <p className="hero-tagline">
//                     I’m Tabitha Sulaiman, a product-minded full-stack builder connecting UX, systems, and engineering.
//                 </p>

//                 <p className="hero-description">
//                     My portfolio documents how I define problems, design usable interfaces, build full-stack features,
//                     and make responsible technical decisions across real project workflows.
//                 </p>

//                 <div className="hero-signal-row" aria-label="Portfolio focus areas">
//                     {heroSignals.map((signal) => (
//                         <span className="hero-signal" key={signal}>
//                             {signal}
//                         </span>
//                     ))}
//                 </div>

//                 <div className="hero-actions" aria-label="Primary actions">
//                     <Link to="/projects" className="button button-primary">
//                         View Projects
//                     </Link>
//                     <Link to="/systems-thinking" className="button button-secondary">
//                         See My Approach
//                     </Link>
//                 </div>
//             </div>

//             <aside className="hero-system-panel" aria-label="Portfolio system summary">
//                 {heroSystemItems.map((item) => (
//                     <div key={item.number}>
//                         <span>{item.number}</span>
//                         <h2>{item.label}</h2>
//                         <p>{item.description}</p>
//                     </div>
//                 ))}
//             </aside>
//         </section>
//     );
// }
function Hero() {
    return (
        <section className="mockup-hero" aria-labelledby="hero-title">
            <div className="mockup-hero-copy">
                <p className="mockup-pill">Product · Design · Engineering</p>

                <h1 id="hero-title">
                    Designing Systems.
                    <br />
                    Building Impact.
                </h1>

                <p className="mockup-hero-description">
                    Computer Science graduate connecting product strategy, UX design,
                    and software engineering to build useful, usable, and scalable
                    digital experiences.
                </p>

                <div className="hero-actions" aria-label="Primary actions">
                    <Link to="/projects" className="button button-primary">
                        View My Work →
                    </Link>

                    <a href="#role-pathways" className="button button-secondary">
                        Explore by Role
                    </a>
                </div>
            </div>

            <div className="mockup-hero-visual" aria-label="Hero visual placeholder">
                <div className="mockup-portrait-placeholder">
                    <span>Visual</span>
                </div>
                <div className="mockup-hero-accent" aria-hidden="true"></div>
                <div className="mockup-dot-column" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </section>
    );
}

export default Hero;