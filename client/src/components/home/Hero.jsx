import { Link } from "react-router-dom";
import portfolioHeadshot from "../../assets/images/portfolioheadshot.png";

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

            <div className="mockup-hero-visual">
                <div className="mockup-portrait-placeholder">
                    <img
                        className="mockup-portrait-image"
                        src={portfolioHeadshot}
                        alt="Tabitha Sulaiman"
                    />
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