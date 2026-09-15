import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import tsLogo from "../../assets/brand/ts-logo.png";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const menuButtonRef = useRef(null);
    const location = useLocation();

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen((currentState) => !currentState);
    };

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape" && menuOpen) {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [menuOpen]);

    return (
        <header className="site-header">
            <NavLink
                className="site-logo"
                to="/"
                aria-label="Tabitha Sulaiman home"
                onClick={closeMenu}
            >
                <img
                    className="site-logo-mark"
                    src={tsLogo}
                    alt=""
                />

                <span className="site-logo-name">
                    Tabitha Sulaiman
                </span>
            </NavLink>

            <button
                ref={menuButtonRef}
                className={`nav-menu-button ${menuOpen ? "is-open" : ""}`}
                type="button"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                aria-controls="site-navigation"
                onClick={toggleMenu}
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </button>

            <nav
                id="site-navigation"
                className={`site-nav ${menuOpen ? "is-open" : ""}`}
                aria-label="Main navigation"
            >
                <NavLink to="/" onClick={closeMenu}>
                    Home
                </NavLink>

                <NavLink to="/projects" onClick={closeMenu}>
                    Work
                </NavLink>

                <NavLink to="/about" onClick={closeMenu}>
                    About
                </NavLink>

                <NavLink
                    className="nav-cta nav-cta-mobile"
                    to="/contact"
                    onClick={closeMenu}
                >
                    Let&apos;s Connect
                    <span aria-hidden="true">→</span>
                </NavLink>
            </nav>

            <NavLink
                className="nav-cta nav-cta-desktop"
                to="/contact"
                onClick={closeMenu}
            >
                Let&apos;s Connect
                <span aria-hidden="true">→</span>
            </NavLink>
        </header>
    );
}

export default Navbar;