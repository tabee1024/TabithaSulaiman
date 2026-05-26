import { useState } from "react";

const initialFormData = {
    name: "",
    email: "",
    title: "",
    company: "",
    reason: "Opportunity",
    message: "",
};

const contactReasons = [
    "Opportunity",
    "Collaboration",
    "Project Feedback",
    "Mentorship",
    "Networking",
    "Other",
];

const API_URL = "/api/contact";

function ContactForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [formStatus, setFormStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus("Please complete your name, email, and message before sending.");
            return;
        }

        try {
            setIsSubmitting(true);
            setFormStatus("Sending your message...");

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                setFormStatus(result.message || "Something went wrong. Please try again.");
                return;
            }

            setFormStatus(result.message || "Your message was sent successfully.");
            setFormData(initialFormData);
        } catch (error) {
            setFormStatus("Unable to send your message right now. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="chat-contact-widget" aria-labelledby="chat-contact-title">
            <div className="chat-thread" aria-hidden="true">
                <div className="chat-bubble chat-bubble-incoming">
                    <p>Hi, I’m Tabitha. What would you like to connect about?</p>
                </div>

                <div className="chat-bubble chat-bubble-outgoing">
                    <p>I’ll share a few details so the message is easy to understand and respond to.</p>
                </div>
            </div>

            <form className="contact-form chat-contact-form" onSubmit={handleSubmit}>
                <div className="chat-form-header">
                    <p className="eyebrow">Chat with me</p>
                    <h2 id="chat-contact-title">Send a focused message.</h2>
                    <p>
                        Share the context I need to understand the opportunity, collaboration,
                        feedback, or question clearly.
                    </p>
                </div>

                <div className="form-grid form-grid-two">
                    <div className="form-field">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            autoComplete="name"
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            autoComplete="email"
                        />
                    </div>
                </div>

                <div className="form-grid form-grid-two">
                    <div className="form-field">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Your role or title"
                            autoComplete="organization-title"
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="company">Company</label>
                        <input
                            id="company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Company or organization"
                            autoComplete="organization"
                        />
                    </div>
                </div>

                <div className="form-field">
                    <label htmlFor="reason">Reason for reaching out</label>
                    <select
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                    >
                        {contactReasons.map((reason) => (
                            <option key={reason} value={reason}>
                                {reason}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share what you want me to know, what you are building, or how I can help."
                        rows="6"
                    />
                </div>

                <button className="button button-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {formStatus && <p className="form-status">{formStatus}</p>}
            </form>
        </section>
    );
}

export default ContactForm;