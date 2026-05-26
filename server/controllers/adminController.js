import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ContactMessage from "../models/ContactMessage.js";

const COOKIE_NAME = "adminToken";

// Helper function to get cookie options based on environment (prod vs. dev).
function getCookieOptions() {
    const isProduction = process.env.NODE_ENV === "production";

    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 1000 * 60 * 60,
    };
}

// Admin login: Validates credentials, generates JWT token, and sets it in an HTTP-only cookie for authentication.
export async function loginAdmin(request, response) {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).json({
            status: "error",
            message: "Email and password are required.",
        });
    }

    // 500 Error: If any missing environment variables needed for admin authentication, returns an error indicating that admin authentication is not configured.
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH || !process.env.JWT_SECRET) {
        return response.status(500).json({
            status: "error",
            message: "Admin authentication is not configured.",
        });
    }

    // Compares the provided email and password with the stored admin credentials. The email is compared in a case-insensitive manner, and the password is compared using bcrypt to check against the hashed password. If either the email or password does not match, it returns a 401 error response indicating invalid admin credentials.
    const emailMatches = email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase();
    const passwordMatches = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);

    // Invalid creds: Email or password is incorrect.
    if (!emailMatches || !passwordMatches) {
        return response.status(401).json({
            status: "error",
            message: "Invalid admin credentials.",
        });
    }

    // Valid Cred Check: Geneartes JWT token with admin info, sets it in an HTTP-only cookie, and returns a success response indicating that the admin login was successful, expires in 1 hour.
    const token = jwt.sign(
        {
            email: process.env.ADMIN_EMAIL,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );

    response.cookie(COOKIE_NAME, token, getCookieOptions());

    return response.status(200).json({
        status: "success",
        message: "Admin login successful.",
    });
}

// Admin Message Management: Endpoints for retrieving and updating contact messages, allowing me, the admin to view messages, mark them as read/unread, archive/unarchive them, and add internal notes for follow-up or context.
// GET /api/admin/messages: Retrieves a list of contact messages, with optional filtering to include archived messages. Messages are sorted by creation date (newest first) and limited to 50 entries. Each message includes fields such as name, email, title, company, reason for contact, message content, read/unread status, archived status, admin notes, and timestamps.
export async function getAdminMessages(request, response) {
    const includeArchived = request.query.includeArchived === "true";

    const filter = includeArchived ? {} : { isArchived: false };

    const messages = await ContactMessage.find(filter)
        .sort({ createdAt: -1 })
        .limit(50)
        .select("name email title company reason message isRead isArchived adminNote createdAt updatedAt");

    return response.status(200).json({
        status: "success",
        data: messages,
    });
}

// PUT /api/admin/messages/:messageId: Allows the admin to update specific fields of a contact message, including marking it as read/unread, archived/unarchived, and adding internal admin notes. The endpoint validates the message ID and updates only the provided fields, returning the updated message data in the response.
export async function updateAdminMessage(request, response) {
    const { messageId } = request.params;
    const { isRead, isArchived, adminNote } = request.body;

    
    const updates = {};

    // Only include fields that are provided in the request body for updating. This allows for partial updates to the message document, where the admin can choose to update one or more of the fields without affecting the others.
    if (typeof isRead === "boolean") {
        updates.isRead = isRead;
    }

    if (typeof isArchived === "boolean") {
        updates.isArchived = isArchived;
    }

    if (typeof adminNote === "string") {
        updates.adminNote = adminNote;
    }

    // Invalid message ID format: Returns an error if the provided message ID is not a valid MongoDB ObjectId.
    const updatedMessage = await ContactMessage.findByIdAndUpdate(
        messageId,
        updates,
        {
            new: true,
            runValidators: true,
        }
    ).select("name email title company reason message isRead isArchived adminNote createdAt updatedAt");

    // Message not found: If no message exists with the provided ID, returns a 404 error response indicating that the contact message was not found.
    if (!updatedMessage) {
        return response.status(404).json({
            status: "error",
            message: "Contact message not found.",
        });
    }

    // Successful update: Returns a success response with the updated message data.
    return response.status(200).json({
        status: "success",
        message: "Message updated.",
        data: updatedMessage,
    });
}

// Admin logout: Clears the admin authentication cookie to log out the admin user, returning a success response indicating that the admin has been logged out.
export function logoutAdmin(request, response) {
    response.clearCookie(COOKIE_NAME, getCookieOptions());

    return response.status(200).json({
        status: "success",
        message: "Admin logged out.",
    });
}