function Navbar() {
    return (
        <header className="site-header">
            <a className="site-logo" href="/">
                Tabitha Sulaiman
            </a>

            <nav className="site-nav" aria-label="Main navigation">
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#experience">Experience</a>
                <a href="#systems">Systems</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    );
}

export default Navbar;