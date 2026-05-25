import ContactMessage from "../models/ContactMessage.js";

// Valid Email Format Checker
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Controller function to handle contact form submissions
export const createContactMessage = async (request, response) => {
    try {
        const {
            name,
            email,
            title = "",
            company = "",
            reason = "Other",
            message,
        } = request.body;

        // Does not allow empty name, email, or message fields from the user.
        if (!name || !email || !message) {
            return response.status(400).json({
                status: "error",
                message: "Name, email, and message are required.",
            });
        }

         // Calls validEmail function to check if email is in appropriate format. If not, returns an error response.
        if (!isValidEmail(email)) {
            return response.status(400).json({
                status: "error",
                message: "Please provide a valid email address.",
            });
        }

        /*
        Awaits the creation of a new contact message document in the database using the ContactMessage model. 
        If successful, it returns a success response with the ID and submission timestamp of the new message. 
        If there is a validation error (possibly due to schema constraints), it returns a 400 error response. 
        For any other errors, it logs the error and returns a 500 error response.
        */
        const contactMessage = await ContactMessage.create({
            name,
            email,
            title,
            company,
            reason,
            message,
        });
        // 201 = Created. Successfully created contact message, returning the ID and submission timestamp in the response.
        return response.status(201).json({
            status: "success",
            message: "Your message was sent successfully.",
            data: {
                id: contactMessage._id,
                submittedAt: contactMessage.createdAt,
            },
        });
    } 
    // 400 = Bad Request. User input did not meet validation requirements.
    catch (error) {
        if (error.name === "ValidationError") {
            return response.status(400).json({
                status: "error",
                message: "Please check your contact form details and try again.",
            });
        }

        console.error("Contact message error:", error.message);
        // 500 = Internal Server Error. Backend issue occured during request processing.
        return response.status(500).json({
            status: "error",
            message: "Something went wrong while sending your message.",
        });
    }
};