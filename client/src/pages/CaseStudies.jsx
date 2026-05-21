import Navbar from "../components/layout/Navbar";
import { featuredProjects } from "../data/projects";
import ProjectGrid from "../components/projects/ProjectGrid";

function CaseStudies() {
    return (
        <>
            <Navbar />

            <main className="home-page">
                <section className="home-section" aria-labelledby="case-studies-title">
                    <div className="section-heading">
                        <p className="eyebrow">Case Studies</p>
                        <h1 id="case-studies-title">Project stories that explain the decisions behind the work.</h1>
                        <p>
                            Each case study is structured to show the problem, user need, constraints, product
                            decisions, design decisions, engineering decisions, tradeoffs, and next steps.
                        </p>
                    </div>

                    <ProjectGrid projects={featuredProjects} />
                </section>
            </main>
        </>
    );
}

export default CaseStudies;