import { Link } from "react-router-dom";
import tsLogo from "../../assets/brand/ts-logo.png";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="site-footer-brand">
                <Link className="site-footer-logo" to="/" aria-label="Tabitha Sulaiman home">
                    <img className="site-logo-mark" src={tsLogo} alt="" />
                    <span>Tabitha Sulaiman</span>
                </Link>

                <p>
                    Product-minded Computer Science graduate connecting UX design,
                    software engineering, and systems thinking.
                </p>
            </div>

            <nav className="site-footer-nav" aria-label="Footer navigation">
                <Link to="/">Home</Link>
                <Link to="/projects">Work</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>

            <div className="site-footer-meta">
                <p>© {currentYear} Tabitha Sulaiman.</p>
                <p>Built with React, Express, MongoDB, and product thinking.</p>
            </div>
        </footer>
    );
}

export default Footer;