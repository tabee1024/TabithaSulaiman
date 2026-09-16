function normalizeOrigin(value) {
    if (typeof value !== "string") {
        return "";
    }

    return value.trim().replace(/\/+$/, "");
}


function getAllowedAdminOrigins() {
    const allowedOrigins = new Set();

    const configuredClientOrigin = normalizeOrigin(
        process.env.CLIENT_ORIGIN
    );

    if (configuredClientOrigin) {
        allowedOrigins.add(configuredClientOrigin);
    }

    // Local Vite frontend is allowed only outside production.
    if (process.env.NODE_ENV !== "production") {
        allowedOrigins.add("http://localhost:5173");
    }

    return allowedOrigins;
}


// Protects state-changing admin requests against
// cross-site request forgery.
//
// The browser automatically sends the admin cookie,
// so authentication alone is not sufficient.
//
// We require:
// 1. A trusted Origin.
// 2. A custom header that normal HTML forms cannot send.
export function requireTrustedAdminRequest(
    request,
    response,
    next
) {
    const requestOrigin = normalizeOrigin(
        request.get("origin")
    );

    const adminRequestHeader =
        request.get("x-portfolio-admin-request");

    const allowedOrigins =
        getAllowedAdminOrigins();


    // A custom header provides another CSRF barrier.
    //
    // It is not a secret. Its purpose is to require
    // requests that normal cross-site HTML forms
    // cannot generate.
    if (adminRequestHeader !== "1") {
        return response.status(403).json({
            status: "error",
            message:
                "Admin request could not be verified.",
        });
    }


    // Browser requests in production must contain
    // an Origin header we explicitly trust.
    if (!requestOrigin) {
        if (process.env.NODE_ENV !== "production") {
            return next();
        }

        return response.status(403).json({
            status: "error",
            message:
                "Admin request origin could not be verified.",
        });
    }


    if (!allowedOrigins.has(requestOrigin)) {
        return response.status(403).json({
            status: "error",
            message:
                "Admin request origin is not allowed.",
        });
    }


    next();
}