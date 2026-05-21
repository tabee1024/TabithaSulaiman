import { useState } from "react";

const initialFormData = {
    name: "",
    email: "",
    message: "",
};

function ContactForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [formStatus, setFormStatus] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus("Please complete all fields before submitting.");
            return;
        }

        setFormStatus("Form is ready. Backend connection comes next.");
        console.log("Contact form data:", formData);

        setFormData(initialFormData);
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

            <button className="button button-primary" type="submit">
                Send Message
            </button>

            {formStatus && <p className="form-status">{formStatus}</p>}
        </form>
    );
}

export default ContactForm;