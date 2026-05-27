import { NavLink } from "react-router-dom";
import tsLogo from "../../assets/brand/ts-logo.png";

function Navbar() {
    return (
        <header className="site-header">
            <NavLink className="site-logo" to="/" aria-label="Tabitha Sulaiman home">
                <img className="site-logo-mark" src={tsLogo} alt="" />
                <span className="site-logo-text">Tabitha Sulaiman</span>
            </NavLink>

            <nav className="site-nav" aria-label="Main navigation">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/experience">Experience</NavLink>
                <NavLink to="/systems-thinking">Systems</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </nav>
        </header>
    );
}

export default Navbar;