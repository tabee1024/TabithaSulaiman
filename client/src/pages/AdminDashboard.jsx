import { useState } from "react";
import Navbar from "../components/layout/Navbar";

const initialLoginData = {
    email: "",
    password: "",
};

function AdminDashboard() {
    const [loginData, setLoginData] = useState(initialLoginData);
    const [messages, setMessages] = useState([]);
    const [statusMessage, setStatusMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleLoginChange(event) {
        const { name, value } = event.target;

        setLoginData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    async function fetchMessages() {
        const response = await fetch("/api/admin/messages", {
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

    return (
        <>
            <Navbar />

            <main className="home-page">
                <section className="home-section" aria-labelledby="admin-title">
                    <div className="section-heading">
                        <p className="eyebrow">Admin</p>
                        <h1 id="admin-title">Message dashboard.</h1>
                        <p>
                            Protected tools for reviewing contact submissions from my portfolio.
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
                                    <h2>Contact messages</h2>
                                    <button className="button button-secondary" type="button" onClick={handleLogout}>
                                        Log Out
                                    </button>
                                </div>

                                {messages.length === 0 ? (
                                    <p>No contact messages yet.</p>
                                ) : (
                                    <div className="admin-message-list">
                                        {messages.map((message) => (
                                            <article className="admin-message-card" key={message._id}>
                                                <div className="admin-message-card-header">
                                                    <h3>{message.name}</h3>
                                                    <p>{new Date(message.createdAt).toLocaleString("en-US", {
                                                        timeZone: "America/Los_Angeles",
                                                        dateStyle: "medium",
                                                        timeStyle: "short",
                                                    })} Pacific Time</p>
                                                </div>

                                                <p><strong>Email:</strong> {message.email}</p>
                                                <p><strong>Title:</strong> {message.title || "Not provided"}</p>
                                                <p><strong>Company:</strong> {message.company || "Not provided"}</p>
                                                <p><strong>Reason:</strong> {message.reason || "Other"}</p>
                                                <p><strong>Message:</strong> {message.message}</p>
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