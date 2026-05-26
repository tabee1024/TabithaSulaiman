import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ContactMessage from "../models/ContactMessage.js";

const COOKIE_NAME = "adminToken";

function getCookieOptions() {
    const isProduction = process.env.NODE_ENV === "production";

    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 1000 * 60 * 60,
    };
}

export async function loginAdmin(request, response) {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).json({
            status: "error",
            message: "Email and password are required.",
        });
    }

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH || !process.env.JWT_SECRET) {
        return response.status(500).json({
            status: "error",
            message: "Admin authentication is not configured.",
        });
    }

    const emailMatches = email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase();
    const passwordMatches = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);

    if (!emailMatches || !passwordMatches) {
        return response.status(401).json({
            status: "error",
            message: "Invalid admin credentials.",
        });
    }

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

export async function getAdminMessages(request, response) {
    const messages = await ContactMessage.find()
        .sort({ createdAt: -1 })
        .limit(50)
        .select("name email title company reason message createdAt");

    return response.status(200).json({
        status: "success",
        data: messages,
    });
}

export function logoutAdmin(request, response) {
    response.clearCookie(COOKIE_NAME, getCookieOptions());

    return response.status(200).json({
        status: "success",
        message: "Admin logged out.",
    });
}