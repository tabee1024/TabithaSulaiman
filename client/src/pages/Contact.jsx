import Navbar from "../components/layout/Navbar";
import ContactForm from "../components/contact/ContactForm";

function Contact() {
    return (
        <>
            <Navbar />

            <main className="home-page">
                <section className="home-section" aria-labelledby="contact-title">
                    <div className="section-heading">
                        <p className="eyebrow">Contact</p>
                        <h1 id="contact-title">Let’s connect.</h1>
                        <p>
                            Use the form below to reach out about opportunities, collaborations, project feedback,
                            or questions about my work.
                        </p>
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