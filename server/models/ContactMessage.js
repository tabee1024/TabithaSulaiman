import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
    {
        // Entry fields with validation rules
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxlength: [80, "Name must be 80 characters or fewer"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            maxlength: [120, "Email must be 120 characters or fewer"],
        },

        title: {
            type: String,
            trim: true,
            maxlength: [80, "Title must be 80 characters or fewer"],
            default: "",
        },

        company: {
            type: String,
            trim: true,
            maxlength: [100, "Company must be 100 characters or fewer"],
            default: "",
        },

        reason: {
            type: String,
            enum: [
                "Opportunity",
                "Collaboration",
                "Project Feedback",
                "Mentorship",
                "Networking",
                "Other",
            ],
            default: "Other",
        },

        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
            maxlength: [2000, "Message must be 2000 characters or fewer"],
        },

        // Admin-Only View: Mark messages as read/unread, archived/unarchived, and add internal notes for follow-up or context.
        isRead: {
            type: Boolean,
            default: false,
        },

        isArchived: {
            type: Boolean,
            default: false,
        },

        adminNote: {
            type: String,
            trim: true,
            maxlength: [1000, "Admin note must be 1000 characters or fewer"],
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

// Create the ContactMessage model using the schema
const ContactMessage = mongoose.model(
    "ContactMessage",
    contactMessageSchema
);

export default ContactMessage;

// import mongoose from "mongoose";

// const contactMessageSchema = new mongoose.Schema(
//     {
//         // Entry fields with validation rules
//         name: {
//             type: String,
//             required: [true, "Name is required"],
//             trim: true,
//             maxlength: [80, "Name must be 80 characters or fewer"],
//         },

//         email: {
//             type: String,
//             required: [true, "Email is required"],
//             trim: true,
//             lowercase: true,
//             maxlength: [120, "Email must be 120 characters or fewer"],
//         },

//         title: {
//             type: String,
//             trim: true,
//             maxlength: [80, "Title must be 80 characters or fewer"],
//             default: "",
//         },

//         company: {
//             type: String,
//             trim: true,
//             maxlength: [100, "Company must be 100 characters or fewer"],
//             default: "",
//         },

//         reason: {
//             type: String,
//             enum: [
//                 "Opportunity",
//                 "Collaboration",
//                 "Project Feedback",
//                 "Mentorship",
//                 "Networking",
//                 "Other",
//             ],
//             default: "Other",
//         },

//         message: {
//             type: String,
//             required: [true, "Message is required"],
//             trim: true,
//             maxlength: [2000, "Message must be 2000 characters or fewer"],
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

// // Create the ContactMessage model using the schema
// const ContactMessage = mongoose.model(
//     "ContactMessage",
//     contactMessageSchema
// );

// export default ContactMessage;