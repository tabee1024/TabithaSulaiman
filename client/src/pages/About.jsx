import Navbar from "../components/layout/Navbar";

function About() {
    return (
        <>
            <Navbar />

            <main className="home-page">
                <section className="home-section" aria-labelledby="about-title">
                    <div className="section-heading">
                        <p className="eyebrow">About</p>
                        <h1 id="about-title">Building where product, design, and engineering meet.</h1>
                        <p>
                            I’m a Computer Science graduate focused on creating useful, usable,
                            and thoughtfully engineered digital experiences.
                        </p>
                    </div>

                    <div className="content-card">
                        <h2>What I do</h2>
                        <p>
                            I connect product thinking, UX/UI design, software engineering,
                            and systems thinking to understand problems clearly and build
                            solutions that are practical, readable, and maintainable.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}

export default About;