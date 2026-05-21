const projects = [
    {
        id: "portfolio-mern",
        title: "Personal MERN Portfolio",
        type: "Full-Stack Portfolio",
        status: "In Progress",
        featured: true,
        role: "Product, UI/UX, and Full-Stack Developer",
        audience: "People reviewing my product, design, and engineering work",
        summary:
            "A full-stack portfolio built to document my product thinking, UI/UX decisions, software engineering projects, and systems thinking process.",
        problem:
            "I needed a portfolio that does more than show final projects. It needed to explain how I think, design, build, and make tradeoffs.",
        solution:
            "I am building a MERN application with a structured frontend, reusable components, project data, case study patterns, a contact form, and a future admin dashboard.",
        impact:
            "This project gives me a central place to present my work, document my process, and show how I connect product, design, and engineering decisions.",
        tools: ["React", "Vite", "Node.js", "Express", "MongoDB", "GitHub"],
        skills: ["Product Thinking", "UI/UX", "React Components", "Documentation"],
        links: {
            github: "https://github.com/tabee1024/TabithaSulaiman",
            live: "",
        },
    },
    {
        id: "project-placeholder-one",
        title: "Project Coming Soon",
        type: "Case Study",
        status: "Draft",
        featured: true,
        role: "Product, Design, and Engineering",
        audience: "Users, project reviewers, and future collaborators",
        summary:
            "This card is a placeholder for a project that will be added with a full case study, screenshots, tools, and implementation notes.",
        problem:
            "Project details need a consistent structure so each case study explains the problem, user need, solution, and tradeoffs.",
        solution:
            "This placeholder tests the card layout before final project content is added.",
        impact:
            "The structure keeps future project stories consistent and easier to compare.",
        tools: ["Research", "Design", "Development"],
        skills: ["Problem Framing", "User Flows", "Iteration"],
        links: {
            github: "",
            live: "",
        },
    },
    {
        id: "project-placeholder-two",
        title: "Project Coming Soon",
        type: "Technical Project",
        status: "Draft",
        featured: false,
        role: "Software Engineering",
        audience: "People reviewing technical implementation and structure",
        summary:
            "This card is a second placeholder for testing the project grid and making sure the layout works with multiple projects.",
        problem:
            "The portfolio needs to support several project types without breaking the design or forcing every card to have the same content length.",
        solution:
            "The card layout uses structured fields and flexible spacing so future projects can be added cleanly.",
        impact:
            "The project grid can grow as more work is added.",
        tools: ["React", "CSS", "Git"],
        skills: ["Component Design", "Responsive Layout", "Data Mapping"],
        links: {
            github: "",
            live: "",
        },
    },
];

export const featuredProjects = projects.filter((project) => project.featured);

export default projects;