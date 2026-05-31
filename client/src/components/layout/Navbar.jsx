import { NavLink } from "react-router-dom";
import tsLogo from "../../assets/brand/ts-logo.png";

function Navbar() {
    return (
        <header className="site-header">
            <NavLink className="site-logo" to="/" aria-label="Tabitha Sulaiman home">
                <img className="site-logo-mark" src={tsLogo} alt="" />
                <span className="site-logo-name">Tabitha Sulaiman</span>
            </NavLink>

            <nav className="site-nav" aria-label="Main navigation">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/projects">Work</NavLink>
                <NavLink to="/systems-thinking">Systems</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </nav>

            <NavLink className="nav-cta" to="/contact">
                Let&apos;s Connect <span aria-hidden="true">→</span>
            </NavLink>
        </header>
    );
}

export default Navbar;