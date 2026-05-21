function CaseStudyTemplate({ project }) {
    const caseStudy = project.caseStudy;

    return (
        <div className="case-study-layout">
            <section className="content-card case-study-card">
                <p className="eyebrow">Context</p>
                <p>{caseStudy.context}</p>
            </section>

            <section className="content-card case-study-card">
                <p className="eyebrow">User Need</p>
                <p>{caseStudy.userNeed}</p>
            </section>

            <section className="content-card case-study-card">
                <p className="eyebrow">Constraints</p>
                <ul>
                    {caseStudy.constraints.map((constraint) => (
                        <li key={constraint}>{constraint}</li>
                    ))}
                </ul>
            </section>

            <section className="content-card case-study-card">
                <p className="eyebrow">Product Decisions</p>
                <ul>
                    {caseStudy.productDecisions.map((decision) => (
                        <li key={decision}>{decision}</li>
                    ))}
                </ul>
            </section>

            <section className="content-card case-study-card">
                <p className="eyebrow">Design Decisions</p>
                <ul>
                    {caseStudy.designDecisions.map((decision) => (
                        <li key={decision}>{decision}</li>
                    ))}
                </ul>
            </section>

            <section className="content-card case-study-card">
                <p className="eyebrow">Engineering Decisions</p>
                <ul>
                    {caseStudy.engineeringDecisions.map((decision) => (
                        <li key={decision}>{decision}</li>
                    ))}
                </ul>
            </section>

            <section className="content-card case-study-card">
                <p className="eyebrow">Tradeoffs</p>
                <ul>
                    {caseStudy.tradeoffs.map((tradeoff) => (
                        <li key={tradeoff}>{tradeoff}</li>
                    ))}
                </ul>
            </section>

            <section className="content-card case-study-card">
                <p className="eyebrow">Next Steps</p>
                <ul>
                    {caseStudy.nextSteps.map((step) => (
                        <li key={step}>{step}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default CaseStudyTemplate;