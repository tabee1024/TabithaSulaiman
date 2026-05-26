import { useState } from "react";
import Navbar from "../components/layout/Navbar";

const initialLoginData = {
    email: "",
    password: "",
};

function formatPacificTime(dateValue) {
    return new Date(dateValue).toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        dateStyle: "medium",
        timeStyle: "short",
    });
}

// Admin Dashboard: A protected page that allows me, the admin, to log in and manage contact messages submitted through the portfolio. The dashboard provides an interface for viewing messages, marking them as read/unread, archiving/unarchiving them, and adding internal notes for follow-up or context. The page includes a login form for authentication and displays status messages for various actions.
function AdminDashboard() {
    const [loginData, setLoginData] = useState(initialLoginData);
    const [messages, setMessages] = useState([]);
    const [statusMessage, setStatusMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [includeArchived, setIncludeArchived] = useState(false);

    function handleLoginChange(event) {
        const { name, value } = event.target;

        setLoginData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    async function fetchMessages(showArchived = includeArchived) {
        const endpoint = showArchived
            ? "/api/admin/messages?includeArchived=true"
            : "/api/admin/messages";

            /* Awaits the backend API response for the list of contact messages, 
            including archived messages if the showArchived parameter is true. 
            The request includes credentials (cookies) for authentication. 
            If the response is successful, updates the messages state with the retrieved data; otherwise, 
            throws an error with an appropriate message.
            */
            const response = await fetch(endpoint, {
            method: "GET",
            credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to load admin messages.");
        }

        setMessages(result.data || []);
    }

    async function handleLogin(event) {
        event.preventDefault();

        if (!loginData.email || !loginData.password) {
            setStatusMessage("Enter the admin email and password.");
            return;
        }

        try {
            setIsLoading(true);
            setStatusMessage("Signing in...");

            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(loginData),
            });

            const result = await response.json();

            if (!response.ok) {
                setStatusMessage(result.message || "Admin login failed.");
                return;
            }

            setIsLoggedIn(true);
            setLoginData(initialLoginData);
            setStatusMessage(result.message || "Admin login successful.");
            await fetchMessages();
        } catch (error) {
            setStatusMessage(error.message || "Unable to sign in right now.");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleLogout() {
        try {
            setIsLoading(true);

            await fetch("/api/admin/logout", {
                method: "POST",
                credentials: "include",
            });

            setIsLoggedIn(false);
            setMessages([]);
            setStatusMessage("Admin logged out.");
        } catch (error) {
            setStatusMessage("Unable to log out right now.");
        } finally {
            setIsLoading(false);
        }
    }

    async function updateMessage(messageId, updates) {
        try {
            setStatusMessage("Updating message...");

            // Allows me (admin) to update specific areas of the message.
            const response = await fetch(`/api/admin/messages/${messageId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updates),
            });

            const result = await response.json();

            if (!response.ok) {
                setStatusMessage(result.message || "Unable to update message.");
                return;
            }

            setMessages((currentMessages) =>
                currentMessages
                    .map((message) =>
                        message._id === messageId ? result.data : message
                    )
                    .filter((message) => includeArchived || !message.isArchived)
            );

            setStatusMessage(result.message || "Message updated.");
        } catch (error) {
            setStatusMessage("Unable to update message right now.");
        }
    }

    function handleNoteChange(messageId, value) {
        setMessages((currentMessages) =>
            currentMessages.map((message) =>
                message._id === messageId
                    ? { ...message, adminNote: value }
                    : message
            )
        );
    }

    async function handleArchiveToggle(message) {
        await updateMessage(message._id, {
            isArchived: !message.isArchived,
        });
    }

    async function handleReadToggle(message) {
        await updateMessage(message._id, {
            isRead: !message.isRead,
        });
    }

    async function handleSaveNote(message) {
        await updateMessage(message._id, {
            adminNote: message.adminNote || "",
        });
    }

    async function handleArchivedFilterChange(event) {
        const shouldIncludeArchived = event.target.checked;

        setIncludeArchived(shouldIncludeArchived);

        try {
            setIsLoading(true);
            await fetchMessages(shouldIncludeArchived);
            setStatusMessage(
                shouldIncludeArchived
                    ? "Showing active and archived messages."
                    : "Showing active messages."
            );
        } catch (error) {
            setStatusMessage(error.message || "Unable to update message filter.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            <main className="home-page">
                <section className="home-section" aria-labelledby="admin-title">
                    <div className="section-heading">
                        <p className="eyebrow">Admin</p>
                        <h1 id="admin-title">Message dashboard.</h1>
                        <p>
                            Protected tools for reviewing, organizing, and following up on contact submissions.
                        </p>
                    </div>

                    <div className="content-card admin-card">
                        {!isLoggedIn ? (
                            <form className="contact-form" onSubmit={handleLogin}>
                                <div className="form-field">
                                    <label htmlFor="admin-email">Email</label>
                                    <input
                                        id="admin-email"
                                        name="email"
                                        type="email"
                                        value={loginData.email}
                                        onChange={handleLoginChange}
                                        placeholder="Admin email"
                                        autoComplete="email"
                                    />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="admin-password">Password</label>
                                    <input
                                        id="admin-password"
                                        name="password"
                                        type="password"
                                        value={loginData.password}
                                        onChange={handleLoginChange}
                                        placeholder="Admin password"
                                        autoComplete="current-password"
                                    />
                                </div>

                                <button className="button button-primary" type="submit" disabled={isLoading}>
                                    {isLoading ? "Signing in..." : "Sign In"}
                                </button>
                            </form>
                        ) : (
                            <div className="admin-dashboard">
                                <div className="admin-dashboard-header">
                                    <div>
                                        <h2>Contact messages</h2>
                                        <p>
                                            Review messages, track follow-up, and keep archived items out of the main queue.
                                        </p>
                                    </div>

                                    <button className="button button-secondary" type="button" onClick={handleLogout}>
                                        Log Out
                                    </button>
                                </div>

                                <label className="admin-filter-control">
                                    <input
                                        type="checkbox"
                                        checked={includeArchived}
                                        onChange={handleArchivedFilterChange}
                                    />
                                    Show archived messages
                                </label>

                                {messages.length === 0 ? (
                                    <p>No contact messages to show.</p>
                                ) : (
                                    <div className="admin-message-list">
                                        {messages.map((message) => (
                                            <article
                                                className={`admin-message-card ${message.isRead ? "admin-message-read" : ""}`}
                                                key={message._id}
                                            >
                                                <div className="admin-message-card-header">
                                                    <div>
                                                        <p className="admin-message-status">
                                                            {message.isArchived
                                                                ? "Archived"
                                                                : message.isRead
                                                                    ? "Read"
                                                                    : "Unread"}
                                                        </p>
                                                        <h3>{message.name}</h3>
                                                    </div>

                                                    <p>{formatPacificTime(message.createdAt)} Pacific Time</p>
                                                </div>

                                                <div className="admin-message-meta">
                                                    <p><strong>Email:</strong> {message.email}</p>
                                                    <p><strong>Title:</strong> {message.title || "Not provided"}</p>
                                                    <p><strong>Company:</strong> {message.company || "Not provided"}</p>
                                                    <p><strong>Reason:</strong> {message.reason || "Other"}</p>
                                                </div>

                                                <p><strong>Message:</strong> {message.message}</p>

                                                <div className="form-field">
                                                    <label htmlFor={`admin-note-${message._id}`}>Private admin note</label>
                                                    <textarea
                                                        id={`admin-note-${message._id}`}
                                                        value={message.adminNote || ""}
                                                        onChange={(event) => handleNoteChange(message._id, event.target.value)}
                                                        placeholder="Add private follow-up notes here."
                                                        rows="3"
                                                    />
                                                </div>

                                                <div className="admin-message-actions">
                                                    <button
                                                        className="button button-secondary"
                                                        type="button"
                                                        onClick={() => handleReadToggle(message)}
                                                    >
                                                        {message.isRead ? "Mark Unread" : "Mark Read"}
                                                    </button>

                                                    <button
                                                        className="button button-secondary"
                                                        type="button"
                                                        onClick={() => handleSaveNote(message)}
                                                    >
                                                        Save Note
                                                    </button>

                                                    <button
                                                        className="button button-secondary"
                                                        type="button"
                                                        onClick={() => handleArchiveToggle(message)}
                                                    >
                                                        {message.isArchived ? "Unarchive" : "Archive"}
                                                    </button>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {statusMessage && <p className="form-status">{statusMessage}</p>}
                    </div>
                </section>
            </main>
        </>
    );
}

export default AdminDashboard;