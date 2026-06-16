import Navbar from "../components/layout/Navbar";
import ContactForm from "../components/contact/ContactForm";

const contactMethods = [
    {
        label: "Email",
        value: "Use the form for the fastest context-rich message.",
    },
    {
        label: "LinkedIn",
        value: "Best for networking, opportunities, and professional updates.",
    },
    {
        label: "GitHub",
        value: "Best for reviewing code, project structure, and implementation work.",
    },
];

function Contact() {
    return (
        <>
            <Navbar />

            <main className="home-page contact-page">
                <section className="home-section contact-hero-section" aria-labelledby="contact-title">
                    <div className="section-heading">
                        <p className="eyebrow">Contact</p>
                        <h1 id="contact-title">Let’s connect with context.</h1>
                        <p>
                            Reach out about opportunities, collaborations, project feedback,
                            mentorship, networking, or thoughtful questions about my work.
                        </p>
                    </div>

                    <aside className="contact-privacy-card" aria-label="Contact privacy note">
                        <p className="project-section-label">Privacy note</p>
                        <p>
                            Messages are used only so I can respond. Contact submissions are
                            handled through my backend and are not sold or shared.
                        </p>
                    </aside>
                </section>

                <section className="home-section contact-layout" aria-label="Contact options and form">
                    <div className="contact-info-panel">
                        <div className="section-heading contact-panel-heading">
                            <p className="eyebrow">Ways to Reach Me</p>
                            <h2>Choose the path that fits the message.</h2>
                            <p>
                                The form is best when you want to include useful context like role,
                                company, reason for reaching out, and project details.
                            </p>
                        </div>

                        <div className="contact-method-grid">
                            {contactMethods.map((method) => (
                                <article className="contact-method-card" key={method.label}>
                                    <h3>{method.label}</h3>
                                    <p>{method.value}</p>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="content-card contact-card">
                        <ContactForm />
                    </div>
                </section>
            </main>
        </>
    );
}

export default Contact;