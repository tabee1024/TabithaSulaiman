import Navbar from "../components/layout/Navbar";

function CaseStudies() {
    return (
        <>
            <Navbar />

            <main className="home-page">
                <section className="home-section" aria-labelledby="case-studies-title">
                    <div className="section-heading">
                        <p className="eyebrow">Case Studies</p>
                        <h1 id="case-studies-title">Case studies will document how I think through product, design, and engineering decisions.</h1>
                        <p>
                            This section will expand each project beyond the final result. The goal is to show the
                            problem, user need, constraints, tradeoffs, design decisions, technical decisions, and
                            lessons learned.
                        </p>
                    </div>

                    <div className="content-card">
                        <h2>Case study format</h2>
                        <p>
                            Each case study will follow a consistent structure so my work is easy to review,
                            compare, and understand.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}

export default CaseStudies;