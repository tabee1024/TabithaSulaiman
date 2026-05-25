import { useState } from "react";

const initialFormData = {
    name: "",
    email: "",
    message: "",
};

const API_URL = "http://localhost:5000/api/contact";

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

    // Waits for backend response after form submission. If successful, shows success message and resets form. If error, shows error message.
    async function handleSubmit(event) {
        event.preventDefault();

        // Frontend Validation: Checks if required fields are filled out before sending data to backend. If not, shows error message and prevents submission.
        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus("Please complete all fields before submitting.");
            return;
        }

        try {
            setIsSubmitting(true);
            setFormStatus("Sending your message...");
            
            // Sends data to API endpoint using POST method.
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
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
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
                />
            </div>

            <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here"
                    rows="6"
                />
            </div>

            <button className="button button-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {formStatus && <p className="form-status">{formStatus}</p>}
        </form>
    );
}

export default ContactForm;