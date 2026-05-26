import jwt from "jsonwebtoken";

export function requireAdmin(request, response, next) {
    const token = request.cookies?.adminToken;

    // No token check: User is not logged in as admin.
    if (!token) {
        return response.status(401).json({
            status: "error",
            message: "Admin login required.",
        });
    }

    // If token is present, verifies the token using the JWT_SECRET. If verification is successful, it extracts the email from the decoded token and attaches it to the request object as request.admin.email, then calls next() to proceed to the next middleware or route handler. If verification fails (e.g., due to an invalid or expired token), it returns a 401 error response indicating that the admin session is invalid or expired.
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        request.admin = {
            email: decodedToken.email,
        };

        next();
    // Expired or invalid token: User's admin session is not valid.
    } catch (error) {
        return response.status(401).json({
            status: "error",
            message: "Admin session is invalid or expired.",
        });
    }
}