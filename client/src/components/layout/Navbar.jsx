import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="site-header">
      <NavLink className="site-logo" to="/">
        Tabitha Sulaiman
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