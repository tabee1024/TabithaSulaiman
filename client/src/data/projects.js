const projects = [
    {
        id: "portfolio-mern",
        title: "Personal MERN Portfolio",
        type: "Full-Stack Portfolio",
        status: "Live Build",
        featured: true,
        role: "Product, UI/UX, and Full-Stack Developer",
        audience: "People reviewing my product, design, and engineering work",
        summary:
            "A full-stack portfolio built to show how I connect product thinking, UI/UX decisions, systems thinking, and software engineering.",
        problem:
            "I needed a portfolio that does more than show final screens. It needed to explain how I think, design, build, and make tradeoffs.",
        solution:
            "I built a MERN application with structured pages, reusable components, project data, a secure contact system, email notifications, custom domain setup, and protected admin tools.",
        impact:
            "This project gives me a central place to present my work, document my process, and show how I connect product, design, systems, and engineering decisions.",
        cardOutcome:
            "Built a secure full-stack contact and admin workflow around my portfolio.",
        thinkingLenses: ["Systems", "Design", "Technical"],
        impactStats: [
            {
                label: "Frontend",
                value: "Vercel",
            },
            {
                label: "Backend",
                value: "Render",
            },
            {
                label: "Database",
                value: "MongoDB",
            },
        ],
        tools: [
            "React",
            "Vite",
            "Node.js",
            "Express",
            "MongoDB",
            "Mongoose",
            "Render",
            "Vercel",
            "Resend",
        ],
        skills: [
            "Product Thinking",
            "UI/UX",
            "Systems Thinking",
            "React Components",
            "API Design",
            "Authentication",
            "Deployment",
            "Security Documentation",
        ],
        cardTags: ["MERN", "Admin", "Contact Flow", "Security"],
        detailCta: "View Project System",
        caseStudy: {
            context:
                "This portfolio is being built as a product, not just a personal site. I am using the project to practice full-stack development while documenting product decisions, UX choices, system constraints, and implementation tradeoffs.",
            userNeed:
                "Someone reviewing my work needs to understand what I built, why I built it, how I made decisions, and how my technical skills connect to product and design thinking.",
            constraints: [
                "The first version needed to stay beginner-friendly while still following a professional structure.",
                "The design needed to feel personal without making the content harder to read.",
                "The project needed to support backend, database, deployment, email, and admin features without exposing secrets or overbuilding too early.",
            ],
            productDecisions: [
                "I treated the portfolio like a product system instead of a static gallery.",
                "I prioritized a working full-stack contact flow before expanding into heavier admin features.",
                "I planned deployment checkpoints so each feature could be tested in production.",
            ],
            designDecisions: [
                "I used warm neutrals and brown interface elements to create a personal but readable visual system.",
                "I avoided pure white as the main background so the interface feels cohesive and less harsh.",
                "I used structured cards and sections to make project information easier to scan.",
            ],
            engineeringDecisions: [
                "I separated pages, components, data, styles, services, routes, controllers, models, and middleware so the project can scale cleanly.",
                "I used Mongoose models to validate and structure contact messages before saving them.",
                "I used environment variables and deployment platform settings to keep secrets out of the codebase.",
            ],
            tradeoffs: [
                "I chose JavaScript instead of TypeScript so I could focus first on React, routing, data flow, and full-stack fundamentals.",
                "I kept project content in local React data for now so the frontend storytelling could evolve quickly.",
                "I added admin authentication before admin reply emails so message access was protected before adding more powerful actions.",
            ],
            nextSteps: [
                "Redesign project cards around systems, design, and technical thinking.",
                "Polish the project detail page structure.",
                "Add stronger production QA and UI refinements.",
                "Evaluate editable portfolio content later if this becomes a customizable portfolio product.",
            ],
        },
        links: {
            github: "https://github.com/tabee1024/TabithaSulaiman",
            live: "https://www.tabithasulaiman.com",
        },
    },
    {
        id: "project-placeholder-one",
        title: "Case Study Coming Soon",
        type: "Product + UX Case Study",
        status: "Draft",
        featured: true,
        role: "Product, Design, and Engineering",
        audience: "People reviewing project process and decision-making",
        summary:
            "A future case study slot structured to show how I frame problems, design flows, and make implementation decisions.",
        problem:
            "Future project stories need a consistent structure so each case study explains the problem, user need, solution, and tradeoffs.",
        solution:
            "This placeholder tests the project storytelling system before final case study content is added.",
        impact:
            "The structure keeps future project stories consistent, scannable, and easier to compare.",
        cardOutcome:
            "Creates a repeatable case study system for future project storytelling.",
        thinkingLenses: ["Systems", "Design"],
        impactStats: [
            {
                label: "Stage",
                value: "Draft",
            },
            {
                label: "Focus",
                value: "UX",
            },
            {
                label: "Format",
                value: "Case Study",
            },
        ],
        tools: ["Research", "Design", "User Flows", "Wireframes"],
        skills: ["Problem Framing", "User Flows", "Iteration", "Storytelling"],
        cardTags: ["UX", "Research", "Flow", "Case Study"],
        detailCta: "View Case Study",
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
        title: "Technical Project Coming Soon",
        type: "Technical Project",
        status: "Draft",
        featured: false,
        role: "Software Engineering",
        audience: "People reviewing technical implementation and structure",
        summary:
            "A future technical project slot for showing implementation decisions, system structure, and engineering tradeoffs.",
        problem:
            "The portfolio needs to support several project types without breaking the design or forcing every card to have the same content length.",
        solution:
            "The card layout uses structured fields and flexible spacing so future projects can be added cleanly.",
        impact:
            "The project grid can grow as more technical work is added.",
        cardOutcome:
            "Tests how technical work can be explained through structure, constraints, and implementation choices.",
        thinkingLenses: ["Technical", "Systems"],
        impactStats: [
            {
                label: "Stage",
                value: "Draft",
            },
            {
                label: "Focus",
                value: "Build",
            },
            {
                label: "Grid",
                value: "Scalable",
            },
        ],
        tools: ["React", "CSS", "Git"],
        skills: ["Component Design", "Responsive Layout", "Data Mapping"],
        cardTags: ["React", "CSS", "Structure", "Build"],
        detailCta: "View Technical Notes",
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