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
        caseStudy: {
            context:
                "This portfolio is being built as a product, not just a personal site. I am using the project to practice full-stack development while also documenting product decisions, UX choices, and implementation tradeoffs.",
            userNeed:
                "Someone reviewing my work needs to understand what I built, why I built it, how I made decisions, and how my technical skills connect to product and design thinking.",
            constraints: [
                "The first version needs to stay beginner-friendly while still following a professional structure.",
                "The design needs to feel personal without making the content harder to read.",
                "The project needs to support future backend, database, and admin features without overbuilding too early.",
            ],
            productDecisions: [
                "I prioritized a working frontend before adding backend complexity.",
                "I started with React project data so the UI could be shaped quickly before moving project data into MongoDB.",
                "I planned deployment checkpoints instead of waiting until the entire application is finished.",
            ],
            designDecisions: [
                "I used a warm retro-inspired palette to make the portfolio feel personal and memorable.",
                "I avoided pure white as the main background so the interface stays visually cohesive and less harsh.",
                "I used cards to group project information because cards make scanning easier.",
            ],
            engineeringDecisions: [
                "I separated pages, components, data, styles, and services so the frontend can scale cleanly.",
                "I added React Router so each major section can become a real page.",
                "I structured project data in a way that can later map to a MongoDB schema.",
            ],
            tradeoffs: [
                "I chose JavaScript instead of TypeScript so I could focus first on React, routing, data flow, and full-stack fundamentals.",
                "I chose local React data before MongoDB project storage so the frontend could be designed and tested faster.",
                "I chose a free web font alternative instead of committing a commercial font file without clear licensing rights.",
            ],
            nextSteps: [
                "Build out project detail pages with stronger case study sections.",
                "Add the Express backend and MongoDB contact form.",
                "Create an admin dashboard foundation after the public portfolio works.",
                "Polish responsiveness, accessibility, and project storytelling before the first professional share.",
            ],
        },
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
        audience: "People reviewing project process and decision-making",
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
        caseStudy: {
            context:
                "This project slot will be replaced with a real case study once the final project information is ready.",
            userNeed:
                "Each project needs enough structure to explain the work clearly without overwhelming the page.",
            constraints: [
                "The final content needs to fit the same card and case study system.",
                "The page needs to support projects with different tools, roles, and outcomes.",
            ],
            productDecisions: [
                "I am using a consistent project schema so each case study follows the same logic.",
            ],
            designDecisions: [
                "The card layout keeps information grouped and easy to scan.",
            ],
            engineeringDecisions: [
                "The project object includes fields that support both the card view and the detail page.",
            ],
            tradeoffs: [
                "The placeholder keeps the layout testable before final content is ready.",
            ],
            nextSteps: [
                "Replace this placeholder with a real project.",
                "Add screenshots, links, and stronger outcome details.",
            ],
        },
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
        caseStudy: {
            context:
                "This placeholder tests how technical projects appear in the portfolio structure.",
            userNeed:
                "Technical work needs to show not only what was coded, but how the project was organized and why decisions were made.",
            constraints: [
                "The grid needs to work with different project lengths.",
                "The data structure needs to stay flexible enough for future backend storage.",
            ],
            productDecisions: [
                "I am separating homepage featured projects from the full project collection.",
            ],
            designDecisions: [
                "The layout uses consistent spacing and card structure to make multiple projects easier to compare.",
            ],
            engineeringDecisions: [
                "The same ProjectCard component renders every project from data.",
            ],
            tradeoffs: [
                "The placeholder content is temporary, but the component structure is permanent.",
            ],
            nextSteps: [
                "Replace this placeholder with a finished technical project.",
                "Add GitHub and live demo links when available.",
            ],
        },
        links: {
            github: "",
            live: "",
        },
    },
];

export const featuredProjects = projects.filter((project) => project.featured);

export default projects;