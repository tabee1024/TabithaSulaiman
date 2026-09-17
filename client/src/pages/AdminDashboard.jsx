import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import AdminProjectEditor from "../components/admin/AdminProjectEditor";

const initialLoginData = {
    email: "",
    password: "",
};


function formatPacificTime(dateValue) {
    if (!dateValue) {
        return "Not available";
    }

    return new Date(dateValue).toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
        dateStyle: "medium",
        timeStyle: "short",
    });
}


function getProjectTitle(project) {
    return (
        project.draft?.title ||
        project.published?.title ||
        project.slug ||
        "Untitled project"
    );
}


function getProjectFeatured(project) {
    return Boolean(
        project.draft?.featured ??
        project.published?.featured
    );
}


function getProjectRoleLenses(project) {
    const roleLenses =
        project.draft?.roleLens ||
        project.published?.roleLens ||
        [];

    return Array.isArray(roleLenses)
        ? roleLenses
        : [];
}


function AdminDashboard() {
    const [loginData, setLoginData] =
        useState(initialLoginData);

    const [messages, setMessages] =
        useState([]);

    const [projects, setProjects] =
        useState([]);

    const [statusMessage, setStatusMessage] =
        useState("");

    const [isLoggedIn, setIsLoggedIn] =
        useState(false);

    const [isLoading, setIsLoading] =
        useState(false);

    const [
        includeArchivedMessages,
        setIncludeArchivedMessages,
    ] = useState(false);

    const [
        includeArchivedProjects,
        setIncludeArchivedProjects,
    ] = useState(false);

    const [activeAdminView, setActiveAdminView] =
        useState("messages");

    const [selectedProject, setSelectedProject] =
        useState(null);

    const [editingProjectId, setEditingProjectId] =
        useState("");


    function handleLoginChange(event) {
        const { name, value } =
            event.target;

        setLoginData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }


    async function fetchMessages(
        showArchived =
            includeArchivedMessages
    ) {
        const endpoint =
            showArchived
                ? "/api/admin/messages?includeArchived=true"
                : "/api/admin/messages";

        const response =
            await fetch(endpoint, {
                method: "GET",
                credentials: "include",
            });

        const result =
            await response.json();

        if (!response.ok) {
            throw new Error(
                result.message ||
                "Unable to load admin messages."
            );
        }

        setMessages(
            Array.isArray(result.data)
                ? result.data
                : []
        );
    }


    async function fetchProjects(
        showArchived =
            includeArchivedProjects
    ) {
        const endpoint =
            showArchived
                ? "/api/admin/projects?includeArchived=true"
                : "/api/admin/projects";

        const response =
            await fetch(endpoint, {
                method: "GET",
                credentials: "include",
            });

        const result =
            await response.json();

        if (!response.ok) {
            throw new Error(
                result.message ||
                "Unable to load admin projects."
            );
        }

        setProjects(
            Array.isArray(result.data)
                ? result.data
                : []
        );
    }


    async function loadAdminData() {
        await Promise.all([
            fetchMessages(false),
            fetchProjects(false),
        ]);
    }


    async function handleLogin(event) {
        event.preventDefault();

        if (
            !loginData.email ||
            !loginData.password
        ) {
            setStatusMessage(
                "Enter the admin email and password."
            );

            return;
        }

        try {
            setIsLoading(true);
            setStatusMessage(
                "Signing in..."
            );

            const response =
                await fetch(
                    "/api/admin/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify(
                            loginData
                        ),
                    }
                );

            const result =
                await response.json();

            if (!response.ok) {
                setStatusMessage(
                    result.message ||
                    "Admin login failed."
                );

                return;
            }

            setIsLoggedIn(true);
            setLoginData(
                initialLoginData
            );

            setIncludeArchivedMessages(
                false
            );

            setIncludeArchivedProjects(
                false
            );

            await loadAdminData();

            setStatusMessage(
                result.message ||
                "Admin login successful."
            );
        } catch (error) {
            setStatusMessage(
                error.message ||
                "Unable to sign in right now."
            );
        } finally {
            setIsLoading(false);
        }
    }


    async function handleLogout() {
        try {
            setIsLoading(true);

            await fetch(
                "/api/admin/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            setIsLoggedIn(false);
            setMessages([]);
            setProjects([]);
            setSelectedProject(null);
            setEditingProjectId("");

            setActiveAdminView(
                "messages"
            );

            setIncludeArchivedMessages(
                false
            );

            setIncludeArchivedProjects(
                false
            );

            setStatusMessage(
                "Admin logged out."
            );
        } catch (error) {
            setStatusMessage(
                "Unable to log out right now."
            );
        } finally {
            setIsLoading(false);
        }
    }


    async function updateMessage(
        messageId,
        updates
    ) {
        try {
            setStatusMessage(
                "Updating message..."
            );

            const response =
                await fetch(
                    `/api/admin/messages/${messageId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify(
                            updates
                        ),
                    }
                );

            const result =
                await response.json();

            if (!response.ok) {
                setStatusMessage(
                    result.message ||
                    "Unable to update message."
                );

                return;
            }

            setMessages(
                (currentMessages) =>
                    currentMessages
                        .map(
                            (message) =>
                                message._id ===
                                    messageId
                                    ? result.data
                                    : message
                        )
                        .filter(
                            (message) =>
                                includeArchivedMessages ||
                                !message.isArchived
                        )
            );

            setStatusMessage(
                result.message ||
                "Message updated."
            );
        } catch (error) {
            setStatusMessage(
                "Unable to update message right now."
            );
        }
    }


    function handleNoteChange(
        messageId,
        value
    ) {
        setMessages(
            (currentMessages) =>
                currentMessages.map(
                    (message) =>
                        message._id ===
                            messageId
                            ? {
                                ...message,
                                adminNote:
                                    value,
                            }
                            : message
                )
        );
    }


    async function handleArchiveToggle(
        message
    ) {
        await updateMessage(
            message._id,
            {
                isArchived:
                    !message.isArchived,
            }
        );
    }


    async function handleReadToggle(
        message
    ) {
        await updateMessage(
            message._id,
            {
                isRead:
                    !message.isRead,
            }
        );
    }


    async function handleSaveNote(
        message
    ) {
        await updateMessage(
            message._id,
            {
                adminNote:
                    message.adminNote ||
                    "",
            }
        );
    }


    async function handleArchivedMessageFilterChange(
        event
    ) {
        const shouldIncludeArchived =
            event.target.checked;

        setIncludeArchivedMessages(
            shouldIncludeArchived
        );

        try {
            setIsLoading(true);

            await fetchMessages(
                shouldIncludeArchived
            );

            setStatusMessage(
                shouldIncludeArchived
                    ? "Showing active and archived messages."
                    : "Showing active messages."
            );
        } catch (error) {
            setStatusMessage(
                error.message ||
                "Unable to update message filter."
            );
        } finally {
            setIsLoading(false);
        }
    }


    async function handleArchivedProjectFilterChange(
        event
    ) {
        const shouldIncludeArchived =
            event.target.checked;

        setIncludeArchivedProjects(
            shouldIncludeArchived
        );

        try {
            setIsLoading(true);

            await fetchProjects(
                shouldIncludeArchived
            );

            setStatusMessage(
                shouldIncludeArchived
                    ? "Showing active and archived projects."
                    : "Showing active projects."
            );
        } catch (error) {
            setStatusMessage(
                error.message ||
                "Unable to update project filter."
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchProjectById(projectId) {
        const response =
            await fetch(
                `/api/admin/projects/${projectId}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

        const result =
            await response.json();

        if (!response.ok) {
            throw new Error(
                result.message ||
                "Unable to load this project."
            );
        }

        return result.data;
    }


    async function handleEditProject(projectId) {
        try {
            setEditingProjectId(
                projectId
            );

            setStatusMessage(
                "Loading project draft..."
            );

            const project =
                await fetchProjectById(
                    projectId
                );

            setSelectedProject(
                project
            );

            setStatusMessage("");
        } catch (error) {
            setStatusMessage(
                error.message ||
                "Unable to open the project editor."
            );
        } finally {
            setEditingProjectId("");
        }
    }


    function handleCloseProjectEditor() {
        setSelectedProject(
            null
        );

        setStatusMessage("");
    }


    async function handleProjectSaved(projectId) {
        await fetchProjects(
            includeArchivedProjects
        );

        const refreshedProject =
            await fetchProjectById(
                projectId
            );

        setSelectedProject(
            refreshedProject
        );

        setStatusMessage(
            "Project draft saved."
        );
    }


    function showMessages() {
        if (selectedProject) {
            const shouldLeave =
                window.confirm(
                    "Leave the project editor? Any unsaved changes will be lost."
                );

            if (!shouldLeave) {
                return;
            }

            setSelectedProject(
                null
            );
        }

        setActiveAdminView(
            "messages"
        );

        setStatusMessage("");
    }


    function showProjects() {
        setActiveAdminView(
            "projects"
        );
        setStatusMessage("");
    }


    return (
        <>
            <Navbar />

            <main className="home-page">
                <section
                    className="home-section"
                    aria-labelledby="admin-title"
                >
                    <div className="section-heading">
                        <p className="eyebrow">
                            Admin
                        </p>

                        <h1 id="admin-title">
                            Portfolio dashboard.
                        </h1>

                        <p>
                            Protected tools for
                            managing contact messages
                            and portfolio project
                            content.
                        </p>
                    </div>

                    <div className="content-card admin-card">
                        {!isLoggedIn ? (
                            <form
                                className="contact-form"
                                onSubmit={
                                    handleLogin
                                }
                            >
                                <div className="form-field">
                                    <label htmlFor="admin-email">
                                        Email
                                    </label>

                                    <input
                                        id="admin-email"
                                        name="email"
                                        type="email"
                                        value={
                                            loginData.email
                                        }
                                        onChange={
                                            handleLoginChange
                                        }
                                        placeholder="Admin email"
                                        autoComplete="email"
                                    />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="admin-password">
                                        Password
                                    </label>

                                    <input
                                        id="admin-password"
                                        name="password"
                                        type="password"
                                        value={
                                            loginData.password
                                        }
                                        onChange={
                                            handleLoginChange
                                        }
                                        placeholder="Admin password"
                                        autoComplete="current-password"
                                    />
                                </div>

                                <button
                                    className="button button-primary"
                                    type="submit"
                                    disabled={
                                        isLoading
                                    }
                                >
                                    {isLoading
                                        ? "Signing in..."
                                        : "Sign In"}
                                </button>
                            </form>
                        ) : (
                            <div className="admin-dashboard">
                                <div className="admin-dashboard-header">
                                    <div>
                                        <h2>
                                            Admin workspace
                                        </h2>

                                        <p>
                                            Review messages
                                            and manage the
                                            project content
                                            stored in
                                            MongoDB.
                                        </p>
                                    </div>

                                    <button
                                        className="button button-secondary"
                                        type="button"
                                        onClick={
                                            handleLogout
                                        }
                                        disabled={
                                            isLoading
                                        }
                                    >
                                        Log Out
                                    </button>
                                </div>

                                <div
                                    className="admin-tabs"
                                    role="tablist"
                                    aria-label="Admin sections"
                                >
                                    <button
                                        className={`admin-tab ${activeAdminView ===
                                            "messages"
                                            ? "admin-tab-active"
                                            : ""
                                            }`}
                                        type="button"
                                        role="tab"
                                        aria-selected={
                                            activeAdminView ===
                                            "messages"
                                        }
                                        onClick={
                                            showMessages
                                        }
                                    >
                                        Messages
                                        <span>
                                            {
                                                messages.length
                                            }
                                        </span>
                                    </button>

                                    <button
                                        className={`admin-tab ${activeAdminView ===
                                            "projects"
                                            ? "admin-tab-active"
                                            : ""
                                            }`}
                                        type="button"
                                        role="tab"
                                        aria-selected={
                                            activeAdminView ===
                                            "projects"
                                        }
                                        onClick={
                                            showProjects
                                        }
                                    >
                                        Projects
                                        <span>
                                            {
                                                projects.length
                                            }
                                        </span>
                                    </button>
                                </div>

                                {activeAdminView ===
                                    "messages" ? (
                                    <section
                                        className="admin-view"
                                        aria-labelledby="admin-messages-title"
                                    >
                                        <div className="admin-view-header">
                                            <div>
                                                <h2 id="admin-messages-title">
                                                    Contact
                                                    messages
                                                </h2>

                                                <p>
                                                    Review
                                                    messages,
                                                    track
                                                    follow-up,
                                                    and keep
                                                    archived
                                                    items out
                                                    of the
                                                    main
                                                    queue.
                                                </p>
                                            </div>

                                            <label className="admin-filter-control">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        includeArchivedMessages
                                                    }
                                                    onChange={
                                                        handleArchivedMessageFilterChange
                                                    }
                                                />

                                                Show
                                                archived
                                                messages
                                            </label>
                                        </div>

                                        {messages.length ===
                                            0 ? (
                                            <p>
                                                No contact
                                                messages to
                                                show.
                                            </p>
                                        ) : (
                                            <div className="admin-message-list">
                                                {messages.map(
                                                    (
                                                        message
                                                    ) => (
                                                        <article
                                                            className={`admin-message-card ${message.isRead
                                                                ? "admin-message-read"
                                                                : ""
                                                                }`}
                                                            key={
                                                                message._id
                                                            }
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

                                                                    <h3>
                                                                        {
                                                                            message.name
                                                                        }
                                                                    </h3>
                                                                </div>

                                                                <p>
                                                                    {formatPacificTime(
                                                                        message.createdAt
                                                                    )}{" "}
                                                                    Pacific
                                                                    Time
                                                                </p>
                                                            </div>

                                                            <div className="admin-message-meta">
                                                                <p>
                                                                    <strong>
                                                                        Email:
                                                                    </strong>{" "}
                                                                    {
                                                                        message.email
                                                                    }
                                                                </p>

                                                                <p>
                                                                    <strong>
                                                                        Title:
                                                                    </strong>{" "}
                                                                    {message.title ||
                                                                        "Not provided"}
                                                                </p>

                                                                <p>
                                                                    <strong>
                                                                        Company:
                                                                    </strong>{" "}
                                                                    {message.company ||
                                                                        "Not provided"}
                                                                </p>

                                                                <p>
                                                                    <strong>
                                                                        Reason:
                                                                    </strong>{" "}
                                                                    {message.reason ||
                                                                        "Other"}
                                                                </p>
                                                            </div>

                                                            <p>
                                                                <strong>
                                                                    Message:
                                                                </strong>{" "}
                                                                {
                                                                    message.message
                                                                }
                                                            </p>

                                                            <div className="form-field">
                                                                <label
                                                                    htmlFor={`admin-note-${message._id}`}
                                                                >
                                                                    Private
                                                                    admin
                                                                    note
                                                                </label>

                                                                <textarea
                                                                    id={`admin-note-${message._id}`}
                                                                    value={
                                                                        message.adminNote ||
                                                                        ""
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        handleNoteChange(
                                                                            message._id,
                                                                            event
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    placeholder="Add private follow-up notes here."
                                                                    rows="3"
                                                                />
                                                            </div>

                                                            <div className="admin-message-actions">
                                                                <button
                                                                    className="button button-secondary"
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleReadToggle(
                                                                            message
                                                                        )
                                                                    }
                                                                >
                                                                    {message.isRead
                                                                        ? "Mark Unread"
                                                                        : "Mark Read"}
                                                                </button>

                                                                <button
                                                                    className="button button-secondary"
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleSaveNote(
                                                                            message
                                                                        )
                                                                    }
                                                                >
                                                                    Save
                                                                    Note
                                                                </button>

                                                                <button
                                                                    className="button button-secondary"
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleArchiveToggle(
                                                                            message
                                                                        )
                                                                    }
                                                                >
                                                                    {message.isArchived
                                                                        ? "Unarchive"
                                                                        : "Archive"}
                                                                </button>
                                                            </div>
                                                        </article>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </section>
                                ) : (
                                    <section
                                        className="admin-view"
                                        aria-labelledby="admin-projects-title"
                                    >
                                        {selectedProject ? (
                                            <AdminProjectEditor
                                                project={selectedProject}
                                                onBack={handleCloseProjectEditor}
                                                onSaved={handleProjectSaved}
                                            />
                                        ) : (
                                            <>
                                                <div className="admin-view-header">
                                            <div>
                                                <h2 id="admin-projects-title">
                                                    Projects
                                                </h2>

                                                <p>
                                                    View the
                                                    portfolio
                                                    projects
                                                    currently
                                                    stored in
                                                    MongoDB.
                                                    Editing
                                                    arrives in
                                                    the next
                                                    CMS step.
                                                </p>
                                            </div>

                                            <label className="admin-filter-control">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        includeArchivedProjects
                                                    }
                                                    onChange={
                                                        handleArchivedProjectFilterChange
                                                    }
                                                />

                                                Show
                                                archived
                                                projects
                                            </label>
                                        </div>

                                        <div className="admin-project-summary">
                                            <div>
                                                <strong>
                                                    {
                                                        projects.length
                                                    }
                                                </strong>
                                                <span>
                                                    Showing
                                                </span>
                                            </div>

                                            <div>
                                                <strong>
                                                    {
                                                        projects.filter(
                                                            (
                                                                project
                                                            ) =>
                                                                project.publicationStatus ===
                                                                "published"
                                                        )
                                                            .length
                                                    }
                                                </strong>
                                                <span>
                                                    Published
                                                </span>
                                            </div>

                                            <div>
                                                <strong>
                                                    {
                                                        projects.filter(
                                                            (
                                                                project
                                                            ) =>
                                                                project.publicationStatus ===
                                                                "draft"
                                                        )
                                                            .length
                                                    }
                                                </strong>
                                                <span>
                                                    Draft
                                                </span>
                                            </div>

                                            <div>
                                                <strong>
                                                    {
                                                        projects.filter(
                                                            (
                                                                project
                                                            ) =>
                                                                project.isArchived
                                                        )
                                                            .length
                                                    }
                                                </strong>
                                                <span>
                                                    Archived
                                                </span>
                                            </div>
                                        </div>

                                        {projects.length ===
                                            0 ? (
                                            <p>
                                                No projects
                                                to show.
                                            </p>
                                        ) : (
                                            <div className="admin-project-list">
                                                {projects.map(
                                                    (
                                                        project
                                                    ) => {
                                                        const roleLenses =
                                                            getProjectRoleLenses(
                                                                project
                                                            );

                                                        const featured =
                                                            getProjectFeatured(
                                                                project
                                                            );

                                                        return (
                                                            <article
                                                                className="admin-project-card"
                                                                key={
                                                                    project._id
                                                                }
                                                            >
                                                                <div className="admin-project-card-header">
                                                                    <div>
                                                                        <div className="admin-project-status-group">
                                                                            <span
                                                                                className={`admin-project-status ${project.publicationStatus ===
                                                                                    "published"
                                                                                    ? "admin-project-status-published"
                                                                                    : "admin-project-status-draft"
                                                                                    }`}
                                                                            >
                                                                                {project.publicationStatus ===
                                                                                    "published"
                                                                                    ? "Published"
                                                                                    : "Draft"}
                                                                            </span>

                                                                            {project.isArchived && (
                                                                                <span className="admin-project-status">
                                                                                    Archived
                                                                                </span>
                                                                            )}

                                                                            {featured && (
                                                                                <span className="admin-project-status">
                                                                                    Featured
                                                                                </span>
                                                                            )}
                                                                        </div>

                                                                        <h3>
                                                                            {getProjectTitle(
                                                                                project
                                                                            )}
                                                                        </h3>

                                                                        <p className="admin-project-slug">
                                                                            /
                                                                            {
                                                                                project.slug
                                                                            }
                                                                        </p>
                                                                    </div>

                                                                    <p className="admin-project-updated">
                                                                        Updated{" "}
                                                                        {formatPacificTime(
                                                                            project.updatedAt
                                                                        )}
                                                                    </p>
                                                                </div>

                                                                <div className="admin-project-meta">
                                                                    <p>
                                                                        <strong>
                                                                            Revision
                                                                        </strong>
                                                                        <span>
                                                                            {project.revision ??
                                                                                0}
                                                                        </span>
                                                                    </p>

                                                                    <p>
                                                                        <strong>
                                                                            Content
                                                                            status
                                                                        </strong>
                                                                        <span>
                                                                            {project.draft?.status ||
                                                                                project.published?.status ||
                                                                                "Not set"}
                                                                        </span>
                                                                    </p>

                                                                    <p>
                                                                        <strong>
                                                                            Order
                                                                        </strong>
                                                                        <span>
                                                                            {project.draft?.order ??
                                                                                project.published?.order ??
                                                                                "Not set"}
                                                                        </span>
                                                                    </p>

                                                                    <p>
                                                                        <strong>
                                                                            Last
                                                                            published
                                                                        </strong>
                                                                        <span>
                                                                            {project.publishedAt
                                                                                ? formatPacificTime(
                                                                                    project.publishedAt
                                                                                )
                                                                                : "Never"}
                                                                        </span>
                                                                    </p>
                                                                </div>

                                                                <div className="admin-project-lenses">
                                                                    {roleLenses.length >
                                                                        0 ? (
                                                                        roleLenses.map(
                                                                            (
                                                                                lens
                                                                            ) => (
                                                                                <span
                                                                                    className="admin-project-lens"
                                                                                    key={
                                                                                        lens
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        lens
                                                                                    }
                                                                                </span>
                                                                            )
                                                                        )
                                                                    ) : (
                                                                        <span className="admin-project-lens">
                                                                            No
                                                                            role
                                                                            lens
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                <div className="admin-project-actions">
                                                                    <button
                                                                        className="button button-secondary"
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleEditProject(
                                                                                project._id
                                                                            )
                                                                        }
                                                                        disabled={Boolean(
                                                                            editingProjectId
                                                                        )}
                                                                    >
                                                                        {editingProjectId ===
                                                                        project._id
                                                                            ? "Loading..."
                                                                            : "Edit Draft"}
                                                                    </button>
                                                                </div>
                                                            </article>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </section>
                        )}
                    </div>
                        )}

                    {statusMessage && (
                        <p
                            className="form-status"
                            aria-live="polite"
                        >
                            {statusMessage}
                        </p>
                    )}
                </div>
            </section>
        </main >
        </>
    );
}


export default AdminDashboard;