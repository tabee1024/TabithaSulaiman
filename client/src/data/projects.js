const projects = [
    {
        id: "portfolio-mern",
        title: "Personal MERN Portfolio",
        subtitle: "Full-stack portfolio, contact system, and admin workflow",
        type: "Full-Stack Portfolio",
        displayType: "case-study",
        status: "Live Build",
        featured: true,
        role: "Product, UI/UX, and Full-Stack Developer",
        audience: "People reviewing my product, design, systems, and engineering work",
        summary:
            "A full-stack portfolio built to show how I connect product thinking, UI/UX decisions, systems thinking, and software engineering.",
        shortValue:
            "A secure full-stack portfolio system with contact submissions, email notifications, admin review, and recruiter-centered project storytelling.",
        problem:
            "I needed a portfolio that does more than show final screens. It needed to explain how I think, design, build, and make tradeoffs.",
        solution:
            "I built a MERN application with structured pages, reusable components, project data, a secure contact system, email notifications, custom domain setup, and protected admin tools.",
        impact:
            "This project gives me a central place to present my work, document my process, and show how I connect product, design, systems, and engineering decisions.",
        cardOutcome:
            "Built a secure full-stack contact and admin workflow around my portfolio.",
        thinkingLenses: ["Product", "UX/UI", "Systems", "Engineering"],
        roleLens: ["product", "ux-ui", "systems", "engineering"],
        proofPoints: [
            "Built a production contact flow with frontend and backend validation.",
            "Saved contact submissions in MongoDB Atlas and sent Resend notifications.",
            "Added protected admin tools for reading, archiving, and annotating messages.",
        ],
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
        searchableTags: [
            "react",
            "vite",
            "node",
            "express",
            "mongodb",
            "mongoose",
            "render",
            "vercel",
            "resend",
            "security",
            "authentication",
            "api",
            "product",
            "ux-ui",
            "systems",
            "engineering",
        ],
        detailCta: "View Project System",
        sortDate: "2025-01",
        order: 1,
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
                "Polish the Work page and project cards around recruiter scan paths.",
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
        id: "ge-healthcare-vlanbuddy",
        title: "General Electric (GE) HealthCare",
        subtitle: "VLANBuddy, self-service network orchestration for medical-device validation labs",
        type: "Software Engineering Internship",
        displayType: "experience",
        status: "Completed",
        featured: true,
        role: "Software Engineering Intern",
        audience:
            "Medical-device validation engineers, infrastructure engineers, and network engineers",
        location: "Waukesha, WI",
        date: "May 2025 - Aug 2025",
        summary:
            "Built VLANBuddy, a spatially driven network orchestration platform that let engineers safely configure lab VLANs without depending on network specialists for routine requests.",
        shortValue:
            "Turned an expert-dependent infrastructure workflow into a self-service product spanning 40+ Cisco switches and 2,000+ VLAN records.",
        problem:
            "Medical-device engineers regularly needed isolated network configurations for testing, but each change required manual requests, Cisco expertise, and support from a small infrastructure team.",
        solution:
            "Built a map-driven platform that translated physical lab locations into room, wall-jack, switch-port, and VLAN workflows backed by APIs, SSH automation, caching, validation, and concurrency safeguards.",
        impact:
            "Reduced support tickets by 75%, configuration time by 70%, and VLAN data retrieval latency by 80% while giving engineers safer self-service access.",
        cardOutcome:
            "Reduced support tickets 75% and setup time 70% by replacing repetitive network requests with guided self-service.",
        thinkingLenses: ["Product", "UX/UI", "Systems", "Engineering"],
        roleLens: ["product", "ux-ui", "systems", "engineering"],
        proofPoints: [
            "Supported 40+ Cisco switches and normalized 2,000+ live VLAN records.",
            "Mapped physical rooms and wall jacks to switch ports so users did not need networking expertise.",
            "Added validation, caching, request sequencing, and concurrency controls to protect active testing sessions.",
        ],
        impactStats: [
            {
                label: "Support Tickets",
                value: "-75%",
            },
            {
                label: "Setup Time",
                value: "-70%",
            },
            {
                label: "Retrieval Latency",
                value: "-80%",
            },
        ],
        tools: [
            "React.js",
            "Node.js",
            "Express.js",
            "REST APIs",
            "SSH",
            "Cisco IOS CLI",
            "NGINX",
            "PM2",
            "JavaScript",
            "Linux",
        ],
        skills: [
            "Product Requirements",
            "Infrastructure Automation",
            "API Design",
            "Caching",
            "Data Normalization",
            "Concurrency Controls",
            "Network Automation",
            "User Workflow Design",
        ],
        cardTags: ["Platform", "Networking", "Automation", "Internal Tools"],
        searchableTags: [
            "ge",
            "healthcare",
            "vlanbuddy",
            "react",
            "node",
            "express",
            "rest-api",
            "ssh",
            "cisco",
            "vlan",
            "nginx",
            "pm2",
            "network-automation",
            "internal-tools",
            "product",
            "systems",
        ],
        detailCta: "View VLANBuddy Case Study",
        sortDate: "2025-05",
        order: 1,
        caseStudy: {
            context:
                "Medical-device validation engineers needed to move devices between isolated network environments during testing, but even routine VLAN changes depended on networking specialists.",
            userNeed:
                "Engineers needed a way to identify where a device was physically connected and safely change its network configuration without learning Cisco CLI commands or waiting on another team.",
            constraints: [
                "The platform operated inside a sensitive medical-device testing environment.",
                "Constant polling could overload network equipment, so data access had to be selective.",
                "Multiple engineers could not be allowed to overwrite active port configurations.",
                "Advanced configurations such as trunk mode remained outside the first product scope.",
            ],
            productDecisions: [
                "Prioritized high-frequency access-mode workflows instead of exposing every network capability at launch.",
                "Used physical location as the primary navigation model rather than expecting users to understand switches and ports.",
                "Designed self-service around approved engineers while preserving network safeguards.",
            ],
            designDecisions: [
                "Created a map-to-neighborhood-to-room workflow as the primary navigation hierarchy.",
                "Used progressive disclosure so users saw only the network information relevant to their physical location.",
                "Connected custom SVG map interactions directly to room and switch discovery APIs.",
            ],
            engineeringDecisions: [
                "Automated Cisco CLI configuration through backend SSH workflows.",
                "Cached switch state locally to reduce repeated network calls and improve UI response time.",
                "Validated requests before touching network hardware and refreshed state after successful changes.",
                "Added sequencing and port-level concurrency rules to prevent conflicting configurations.",
            ],
            tradeoffs: [
                "Chose event-driven refreshes over continuous polling to reduce switch load.",
                "Kept advanced network configuration out of the first release to reduce risk and simplify adoption.",
                "Used cached state for speed while accounting for possible cache divergence and backend restarts.",
            ],
            nextSteps: [
                "Expand configuration support only where user demand justifies additional network complexity.",
                "Strengthen auditability and state reconciliation for long-running internal use.",
                "Continue measuring adoption and support-ticket reduction across engineering teams.",
            ],
        },
        links: {
            github: "",
            live: "",
        },
    },

    {
        id: "la-tech-platform",
        title: "LA-Tech.org",
        subtitle: "Portfolio-builder and recruiter-discovery platform for early-career technologists",
        type: "Software Engineering Internship",
        displayType: "experience",
        status: "Completed",
        featured: true,
        role: "Software Engineering Intern",
        audience:
            "Students, early-career technologists, recruiters, and hiring partners",
        location: "Los Angeles, CA",
        date: "Feb 2025 - May 2025",
        summary:
            "Improved a React platform that helped early-career technologists consolidate resumes, projects, demos, and technical work into recruiter-ready profiles.",
        shortValue:
            "Improved performance, reliability, and user flows across a recruiter-facing product used to surface early-career technical talent.",
        problem:
            "Candidates often had proof of ability scattered across resumes, GitHub repositories, demos, and project links, making it harder for recruiters to evaluate them quickly.",
        solution:
            "Improved frontend performance, corrected product-flow issues, refined UI behavior, and documented expected system behavior through SRS requirements.",
        impact:
            "Improved load speed by 10%, increased recruiter and user interactions by 15%, and resolved more than 20 product defects.",
        cardOutcome:
            "Lifted interactions 15% while improving load speed 10% across a recruiter-discovery experience.",
        thinkingLenses: ["Product", "UX/UI", "Engineering"],
        roleLens: ["product", "ux-ui", "engineering"],
        proofPoints: [
            "Resolved 20+ navigation, UI, and product-flow defects.",
            "Improved load speed by 10% across the React experience.",
            "Raised recruiter and user interactions by 15%.",
        ],
        impactStats: [
            {
                label: "Interactions",
                value: "+15%",
            },
            {
                label: "Load Speed",
                value: "+10%",
            },
            {
                label: "Defects Resolved",
                value: "20+",
            },
        ],
        tools: ["React.js", "JavaScript", "Jira", "GitHub", "AWS"],
        skills: [
            "Frontend Development",
            "Product Requirements",
            "Performance Optimization",
            "Debugging",
            "User Flows",
            "SRS Documentation",
            "Release Quality",
        ],
        cardTags: ["React", "Growth", "Recruiting", "User Experience"],
        searchableTags: [
            "la-tech",
            "react",
            "javascript",
            "jira",
            "github",
            "aws",
            "frontend",
            "recruiting",
            "performance",
            "ux",
            "product",
        ],
        detailCta: "View Product Work",
        sortDate: "2025-02",
        order: 2,
        caseStudy: {
            context:
                "The product helped early-career technologists package their work into profiles recruiters could evaluate more efficiently.",
            userNeed:
                "Candidates needed a clearer way to communicate technical ability, while recruiters needed faster access to relevant proof of work.",
            constraints: [
                "Changes had to fit an existing React product.",
                "Performance, navigation, and stability directly affected recruiter and candidate engagement.",
                "Requirements needed to be clear enough for engineering handoff.",
            ],
            productDecisions: [
                "Prioritized friction that affected core recruiter and student journeys.",
                "Used performance and interaction outcomes to evaluate improvements.",
            ],
            designDecisions: [
                "Refined navigation and interface behavior around clearer user flows.",
                "Focused changes on usability and clarity rather than unnecessary visual complexity.",
            ],
            engineeringDecisions: [
                "Diagnosed frontend performance bottlenecks and product defects.",
                "Documented expected system behavior through SRS requirements.",
            ],
            tradeoffs: [
                "Focused on high-impact stability and performance improvements within the internship timeline.",
            ],
            nextSteps: [
                "Continue measuring user engagement across recruiter and student flows.",
                "Expand product analytics around where users abandon key journeys.",
            ],
        },
        links: {
            github: "",
            live: "",
        },
    },

    {
        id: "arcs-nasa-jpl-lasan",
        title: "Autonomy Research Center for STEAHM",
        subtitle: "NASA/JPL/LASAN municipal operations and environmental analytics initiative",
        type: "Data Analytics Experience",
        displayType: "experience",
        status: "Completed",
        featured: true,
        role: "Data Analytics & Performance Metrics Associate",
        audience:
            "Municipal stakeholders, technical teams, public-sector decision-makers, and affected communities",
        location: "Los Angeles, CA",
        date: "Aug 2024 - May 2025",
        summary:
            "Analyzed messy municipal operations data to surface route inefficiencies, environmental tradeoffs, and stakeholder-ready recommendations.",
        shortValue:
            "Turned operational data and community constraints into measurable recommendations for municipal service planning.",
        problem:
            "Waste-service operations involved inefficient routes, inconsistent field data, environmental impact, and community constraints that could not be understood from one metric alone.",
        solution:
            "Structured operational data into performance metrics, compared route tradeoffs, and translated findings into recommendations stakeholders could act on.",
        impact:
            "Identified 30% fewer projected municipal routes and supported planning toward a projected 20% methane reduction.",
        cardOutcome:
            "Identified 30% fewer projected routes while supporting recommendations tied to a 20% projected methane reduction.",
        thinkingLenses: ["Data", "Product", "Operations"],
        roleLens: ["data", "product", "systems"],
        proofPoints: [
            "Converted messy field and operations data into comparable performance metrics.",
            "Balanced operational efficiency with environmental and community constraints.",
            "Presented findings as stakeholder-ready tradeoffs and recommendations.",
        ],
        impactStats: [
            {
                label: "Projected Routes",
                value: "-30%",
            },
            {
                label: "Projected Methane",
                value: "-20%",
            },
            {
                label: "Focus",
                value: "Operations",
            },
        ],
        tools: ["Python", "Pandas", "Jupyter Notebook"],
        skills: [
            "Data Analysis",
            "Operational Analytics",
            "KPI Tracking",
            "Data Cleaning",
            "Decision Support",
            "Stakeholder Communication",
            "Process Analysis",
        ],
        cardTags: ["Analytics", "Operations", "Sustainability", "Public Impact"],
        searchableTags: [
            "nasa",
            "jpl",
            "lasan",
            "arcs",
            "python",
            "pandas",
            "jupyter",
            "analytics",
            "operations",
            "sustainability",
            "data",
        ],
        detailCta: "View Analytics Case Study",
        sortDate: "2024-08",
        order: 3,
        caseStudy: {
            context:
                "The project connected municipal operations, environmental impact, and community realities through service and route data.",
            userNeed:
                "Stakeholders needed clearer evidence about where service inefficiencies existed and which changes could improve outcomes.",
            constraints: [
                "Operational data was messy and incomplete.",
                "Efficiency improvements had to account for community and service constraints.",
                "Environmental impact could not be evaluated separately from operational feasibility.",
            ],
            productDecisions: [
                "Focused analysis on metrics that could support practical operational decisions.",
                "Translated raw findings into tradeoffs instead of presenting data without context.",
            ],
            designDecisions: [
                "Structured outputs so technical and nontechnical stakeholders could interpret the same findings.",
            ],
            engineeringDecisions: [
                "Used Python and Pandas to organize and analyze operational data.",
            ],
            tradeoffs: [
                "Treated projected outcomes as estimates rather than overstating them as implemented results.",
            ],
            nextSteps: [
                "Improve longitudinal tracking of service patterns.",
                "Expand validation using additional operational and community data.",
            ],
        },
        links: {
            github: "",
            live: "",
        },
    },

    {
        id: "usc-innovation-corps-ai",
        title: "USC Innovation Corps",
        subtitle: "AI healthcare concept focused on bias, access, and diagnostic risk",
        type: "AI Product Strategy Experience",
        displayType: "experience",
        status: "Completed",
        featured: true,
        role: "AI Solutions Strategist",
        audience:
            "Patients, healthcare stakeholders, and teams evaluating responsible AI opportunities",
        location: "Los Angeles, CA",
        date: "Jan 2023 - Mar 2023",
        summary:
            "Explored an AI healthcare concept designed to surface bias patterns in medical records while balancing feasibility, explainability, and patient trust.",
        shortValue:
            "Turned a patient-access problem into an AI product concept grounded in user research, market analysis, and responsible AI.",
        problem:
            "Language barriers, incomplete documentation, and unequal care patterns can cause important patient context to be overlooked.",
        solution:
            "Explored an AI concept for surfacing bias and risk patterns in medical records through user research, data analysis, market sizing, competitive research, and responsible AI review.",
        impact:
            "Defined a product concept targeting a 25% reduction in diagnostic-error risk and presented the opportunity at NSBE49.",
        cardOutcome:
            "Framed an AI healthcare opportunity around trust, explainability, and a targeted 25% reduction in diagnostic-error risk.",
        thinkingLenses: ["Product", "AI", "Research", "Ethics"],
        roleLens: ["product", "data", "research"],
        proofPoints: [
            "Conducted user, market, and competitive research.",
            "Evaluated model assumptions, explainability, failure modes, and ethical risk.",
            "Presented the concept and product opportunity at NSBE49.",
        ],
        impactStats: [
            {
                label: "Target",
                value: "-25% Risk",
            },
            {
                label: "Focus",
                value: "Responsible AI",
            },
            {
                label: "Presentation",
                value: "NSBE49",
            },
        ],
        tools: [
            "AI Product Strategy",
            "User Research",
            "Responsible AI",
            "Market Sizing",
        ],
        skills: [
            "AI Product Strategy",
            "User Research",
            "Market Research",
            "Competitive Analysis",
            "Responsible AI",
            "Explainability",
            "Risk Assessment",
            "Product Storytelling",
        ],
        cardTags: ["AI", "Healthcare", "Responsible AI", "Product Strategy"],
        searchableTags: [
            "usc",
            "innovation-corps",
            "ai",
            "healthcare",
            "responsible-ai",
            "user-research",
            "market-sizing",
            "bias",
            "explainability",
            "product",
        ],
        detailCta: "View AI Product Case Study",
        sortDate: "2023-01",
        order: 4,
        caseStudy: {
            context:
                "The idea grew from seeing how language and access barriers could prevent important patient context from reaching healthcare providers.",
            userNeed:
                "Patients and care teams need systems that surface important context without creating false confidence in automated outputs.",
            constraints: [
                "Healthcare is a high-trust environment where false positives and false negatives matter.",
                "The concept needed to account for bias, explainability, privacy, and adoption risk.",
                "The work remained a concept and strategy project rather than a deployed production system.",
            ],
            productDecisions: [
                "Started with the patient problem rather than starting with an AI capability.",
                "Evaluated whether AI was appropriate before treating automation as the default solution.",
            ],
            designDecisions: [
                "Focused product thinking on surfacing risk rather than replacing clinical judgment.",
            ],
            engineeringDecisions: [
                "Evaluated model assumptions, failure cases, explainability, and feasibility before proposing broader implementation.",
            ],
            tradeoffs: [
                "Prioritized responsible product framing over overstating technical maturity.",
            ],
            nextSteps: [
                "Validate the problem with broader clinical and patient research.",
                "Define appropriate datasets and evaluation criteria for a prototype.",
                "Test how surfaced risk information should be communicated to users.",
            ],
        },
        links: {
            github: "",
            live: "",
        },
    },
    {
        id: "train-ai-form-corrector",
        title: "trAIn",
        subtitle: "AI Form Corrector",
        type: "AI Fitness Product",
        displayType: "case-study",
        status: "Completed",
        featured: true,
        role: "AI Product / UX Lead",
        audience:
            "People who want immediate, understandable workout-form feedback without relying on a live trainer",
        summary:
            "A mobile AI workout trainer that uses on-device pose detection to evaluate movement and deliver real-time corrective feedback.",
        shortValue:
            "An on-device AI fitness experience balancing model accuracy, mobile latency, offline behavior, and user trust.",
        problem:
            "Exercise feedback loses value when it arrives too slowly, is inaccurate, or overwhelms users while they are moving.",
        solution:
            "Combined CameraX, TensorFlow Lite MoveNet, smoothing, rep and form logic, offline-first behavior, and concise correction cues into a real-time mobile experience.",
        impact:
            "Designed around 30+ FPS, sub-80ms latency, and F1 ≥ 0.90 so product performance remained tied to an experience users could act on.",
        cardOutcome:
            "Balanced 30+ FPS, sub-80ms latency, and F1 ≥ 0.90 around real-time AI feedback users could trust.",
        thinkingLenses: ["Product", "AI", "UX/UI", "Engineering"],
        roleLens: ["product", "ux-ui", "engineering", "data"],
        proofPoints: [
            "Led product direction around accuracy, latency, and usability tradeoffs.",
            "Designed color-coded limb tracking and concise correction cues for active users.",
            "QA-tested onboarding and feedback flows against measurable model behavior.",
        ],
        impactStats: [
            {
                label: "Frame Rate",
                value: "30+ FPS",
            },
            {
                label: "Latency",
                value: "<80ms",
            },
            {
                label: "F1",
                value: "≥0.90",
            },
        ],
        tools: [
            "Kotlin",
            "CameraX",
            "TensorFlow Lite",
            "MoveNet",
            "Supabase",
            "Firebase",
            "Room",
            "WorkManager",
            "Jetpack Compose",
            "Figma",
        ],
        skills: [
            "AI Product Strategy",
            "Model Evaluation",
            "Computer Vision",
            "Pose Estimation",
            "Mobile UX",
            "Product Requirements",
            "QA Testing",
            "Offline-First Design",
        ],
        cardTags: ["AI", "Fitness", "Mobile", "Computer Vision"],
        searchableTags: [
            "train",
            "ai",
            "fitness",
            "kotlin",
            "camerax",
            "tensorflow-lite",
            "movenet",
            "supabase",
            "firebase",
            "computer-vision",
            "pose-estimation",
            "product",
            "ux",
        ],
        detailCta: "View AI Product Case Study",
        sortDate: "2025-08",
        order: 1,
        caseStudy: {
            context:
                "The project explored whether on-device pose estimation could provide workout feedback quickly enough to be useful during movement.",
            userNeed:
                "Users need feedback that is immediate, trustworthy, and simple enough to understand without interrupting a workout.",
            constraints: [
                "Model inference had to remain fast on a mobile device.",
                "Incorrect feedback would quickly undermine user trust.",
                "The interface could not overload a user who was actively moving.",
                "Core feedback needed to remain useful with intermittent connectivity.",
            ],
            productDecisions: [
                "Defined measurable quality thresholds before treating the AI experience as usable.",
                "Prioritized concise corrections over exposing raw model output.",
                "Balanced accuracy, latency, and usability instead of optimizing any single metric in isolation.",
            ],
            designDecisions: [
                "Used color-coded limb tracking to make pose feedback easier to interpret visually.",
                "Kept correction cues short enough to act on during movement.",
                "Designed onboarding to set expectations before real-time feedback began.",
            ],
            engineeringDecisions: [
                "Used TensorFlow Lite MoveNet for on-device pose estimation.",
                "Used CameraX for camera input and mobile inference workflows.",
                "Designed offline-first behavior using local and asynchronous data patterns.",
            ],
            tradeoffs: [
                "Favored actionable feedback over exposing every detected pose signal.",
                "Balanced model complexity against latency and mobile-device constraints.",
            ],
            nextSteps: [
                "Expand exercise coverage while preserving quality thresholds.",
                "Test feedback clarity with a broader set of users.",
                "Continue evaluating where model confidence should affect feedback behavior.",
            ],
        },
        links: {
            github: "",
            live: "",
        },
    },

    {
        id: "csun-nsbe-website",
        title: "CSUN-NSBE Website",
        subtitle: "Chapter Engagement Platform",
        type: "Community Product",
        displayType: "case-study",
        status: "Active",
        featured: true,
        role: "Product / Frontend Lead",
        audience:
            "Members, prospective members, alumni, sponsors, donors, guest speakers, and event attendees",
        summary:
            "A multi-audience chapter platform designed to turn awareness into meaningful actions such as joining, attending, donating, sponsoring, and reconnecting.",
        shortValue:
            "A React engagement platform organizing chapter information around distinct user journeys and conversion paths.",
        problem:
            "Chapter information was fragmented, while each audience needed a different reason and path to engage with the organization.",
        solution:
            "Centralized chapter information and designed distinct journeys around events, resources, donations, internships, newsletters, sponsorship, and membership.",
        impact:
            "Created a single engagement surface for seven distinct audiences and six major content streams.",
        cardOutcome:
            "Designed one platform around 7 audiences, 6 content streams, and clear discovery-to-engagement paths.",
        thinkingLenses: ["Product", "UX/UI", "Growth", "Engineering"],
        roleLens: ["product", "ux-ui", "engineering"],
        proofPoints: [
            "Mapped distinct journeys for 7 stakeholder groups.",
            "Unified 6 previously scattered categories of chapter content.",
            "Designed user paths around joining, attending, donating, sponsoring, learning, and speaking.",
        ],
        impactStats: [
            {
                label: "Audiences",
                value: "7",
            },
            {
                label: "Content Streams",
                value: "6",
            },
            {
                label: "Primary Actions",
                value: "6",
            },
        ],
        tools: ["React.js", "JavaScript", "Figma", "GitHub"],
        skills: [
            "Product Strategy",
            "User Journeys",
            "Information Architecture",
            "Frontend Development",
            "Figma",
            "Community Engagement",
            "Responsive Design",
        ],
        cardTags: ["React", "Community", "Product", "UX"],
        searchableTags: [
            "csun",
            "nsbe",
            "react",
            "javascript",
            "figma",
            "community",
            "engagement",
            "user-journeys",
            "frontend",
            "product",
        ],
        detailCta: "View Community Product",
        sortDate: "2024-08",
        order: 2,
        caseStudy: {
            context:
                "The chapter served several audiences, but information about events, resources, opportunities, and ways to contribute was scattered.",
            userNeed:
                "Each audience needed to understand quickly what the chapter offered and what meaningful action they could take next.",
            constraints: [
                "Different audiences had very different goals.",
                "The product needed to support both information discovery and conversion actions.",
                "Content had to remain maintainable as chapter programming changed.",
            ],
            productDecisions: [
                "Treated the site as a community engagement product rather than a static organization page.",
                "Prioritized journeys around user intent instead of organizing everything by internal chapter structure.",
            ],
            designDecisions: [
                "Structured navigation around discoverability and clear next actions.",
                "Used Figma-backed flows to organize information architecture before implementation.",
            ],
            engineeringDecisions: [
                "Built the frontend in React with reusable components.",
                "Used GitHub for source control and iterative development.",
            ],
            tradeoffs: [
                "Prioritized high-value engagement paths over adding every possible chapter feature at once.",
            ],
            nextSteps: [
                "Continue refining content around conversion and engagement behavior.",
                "Expand reusable content structures for events, internships, and chapter updates.",
            ],
        },
        links: {
            github: "",
            live: "",
        },
    },

    {
        id: "mytasktraq",
        title: "myTasktraq",
        subtitle: "Secure Workflow Manager",
        type: "Full-Stack Productivity Product",
        displayType: "project",
        status: "Completed",
        featured: true,
        role: "Full-Stack Product Developer",
        audience:
            "Users who need a private, structured way to organize projects, tasks, deadlines, and ownership",
        summary:
            "A secure full-stack workflow manager built around authentication, relational data, ownership, and repeatable deployment.",
        shortValue:
            "A protected task-management system combining user-scoped access, relational workflows, and full-stack deployment.",
        problem:
            "Users need to organize work without exposing private project and task data across accounts.",
        solution:
            "Built a full-stack application with authenticated routes, user-scoped access, relational data, Docker containerization, and cloud deployment.",
        impact:
            "Unified four core workflow needs while implementing four layers of access protection from authentication through scoped authorization.",
        cardOutcome:
            "Unified projects, tasks, deadlines, and ownership within a secure user-scoped workflow product.",
        thinkingLenses: ["Product", "Systems", "Engineering"],
        roleLens: ["product", "systems", "engineering"],
        proofPoints: [
            "Implemented JWT authentication and ASP.NET Identity.",
            "Protected routes and user-scoped relational records.",
            "Containerized and deployed the application with Docker and Render.",
        ],
        impactStats: [
            {
                label: "Workflow Needs",
                value: "4",
            },
            {
                label: "Access Layers",
                value: "4",
            },
            {
                label: "Deployment",
                value: "Docker",
            },
        ],
        tools: [
            "Angular",
            "ASP.NET Core 8",
            "SQLite",
            "JWT",
            "ASP.NET Identity",
            "Docker",
            "Render",
        ],
        skills: [
            "Full-Stack Development",
            "REST APIs",
            "Authentication",
            "Authorization",
            "Relational Data",
            "Protected Routes",
            "Containerization",
            "Deployment",
        ],
        cardTags: ["Full-Stack", "Security", "Workflow", "Docker"],
        searchableTags: [
            "task-tracker",
            "mytasktraq",
            "angular",
            "asp-net",
            "sqlite",
            "jwt",
            "identity",
            "docker",
            "render",
            "authentication",
            "authorization",
            "workflow",
        ],
        detailCta: "View Full-Stack Project",
        sortDate: "2025-08",
        order: 3,
        caseStudy: {
            context:
                "The application explored how a task-management product could keep personal work structured while maintaining clear data boundaries between users.",
            userNeed:
                "Users need to see only the projects and tasks they own while still having a simple workflow for organizing deadlines and responsibilities.",
            constraints: [
                "User data had to remain isolated.",
                "Authentication and authorization needed to protect routes and backend data.",
                "The project needed a repeatable deployment workflow.",
            ],
            productDecisions: [
                "Kept the initial product centered on projects, tasks, deadlines, and ownership.",
                "Prioritized privacy and access boundaries as core product requirements.",
            ],
            designDecisions: [
                "Organized the experience around clear ownership and task visibility.",
            ],
            engineeringDecisions: [
                "Used ASP.NET Core Web API with SQLite for relational backend data.",
                "Used JWT and ASP.NET Identity for authentication and user management.",
                "Containerized the application with Docker and deployed through Render.",
            ],
            tradeoffs: [
                "Focused on a clear secure workflow rather than adding broader collaboration features prematurely.",
            ],
            nextSteps: [
                "Expand workflow reporting and project-level visibility.",
                "Add richer status and planning features if collaboration becomes a core use case.",
            ],
        },
        links: {
            github: "",
            live: "",
        },
    },

    {
        id: "the-reckoning",
        title: "The Reckoning",
        subtitle: "QA Reporting Tool",
        type: "Data Product",
        displayType: "project",
        status: "Completed",
        featured: false,
        role: "Data Product Developer",
        audience:
            "QA teams, UAT reviewers, developers, and stakeholders making release decisions",
        summary:
            "A QA reporting tool that transforms noisy bug exports into normalized, queryable release-quality signals.",
        shortValue:
            "A Python and MongoDB workflow that cleans QA exports and turns them into decision-ready release reports.",
        problem:
            "Raw bug exports contained inconsistent dates, duplicate records, noisy fields, and fragmented ownership information that slowed release review.",
        solution:
            "Imported QA exports into MongoDB, normalized inconsistent fields, removed duplicates, and generated blocker, repeat-bug, and owner-activity reports.",
        impact:
            "Made QA trend analysis 40% faster while improving the consistency of data used for release review.",
        cardOutcome:
            "Made QA trend analysis 40% faster by turning inconsistent bug exports into structured product-quality signals.",
        thinkingLenses: ["Data", "Product", "Engineering"],
        roleLens: ["data", "product", "engineering"],
        proofPoints: [
            "Normalized build dates and boolean fields.",
            "Removed duplicate records before reporting.",
            "Generated blocker, repeat-bug, and owner-activity views for QA and UAT review.",
        ],
        impactStats: [
            {
                label: "Analysis Speed",
                value: "+40%",
            },
            {
                label: "Database",
                value: "MongoDB",
            },
            {
                label: "Focus",
                value: "QA/UAT",
            },
        ],
        tools: ["Python", "Pandas", "PyMongo", "MongoDB"],
        skills: [
            "Data Cleaning",
            "Data Validation",
            "MongoDB",
            "Pandas",
            "Reporting Automation",
            "QA Analytics",
            "Release Risk",
        ],
        cardTags: ["Python", "MongoDB", "QA", "Data"],
        searchableTags: [
            "reckoning",
            "python",
            "pandas",
            "pymongo",
            "mongodb",
            "qa",
            "uat",
            "data-cleaning",
            "reporting",
            "release-quality",
        ],
        detailCta: "View Data Product",
        sortDate: "2025-08",
        order: 4,
        caseStudy: {
            context:
                "QA teams needed a faster way to understand recurring defects, blockers, and ownership patterns from raw bug exports.",
            userNeed:
                "Reviewers needed trustworthy quality signals without manually cleaning the same data before every analysis.",
            constraints: [
                "Source exports contained inconsistent and duplicate values.",
                "Reports needed to remain useful for both detailed QA review and stakeholder summaries.",
            ],
            productDecisions: [
                "Prioritized blocker, repeat-bug, and owner signals that could influence release decisions.",
            ],
            designDecisions: [
                "Kept outputs structured and exportable for QA, UAT, and stakeholder review.",
            ],
            engineeringDecisions: [
                "Used Pandas for preprocessing and PyMongo for database workflows.",
                "Normalized dates and boolean fields before generating analysis.",
            ],
            tradeoffs: [
                "Focused on reliable reporting rather than building a heavier graphical interface.",
            ],
            nextSteps: [
                "Add richer historical comparisons across builds.",
                "Expand release-risk scoring only if the underlying data remains trustworthy.",
            ],
        },
        links: {
            github: "",
            live: "",
        },
    },

    {
        id: "the-crucible",
        title: "The Crucible",
        subtitle: "Media Data Pipeline",
        type: "Automation & Data Pipeline",
        displayType: "project",
        status: "Completed",
        featured: false,
        role: "Data Pipeline Developer",
        audience:
            "Production and media teams managing files, timecodes, metadata, previews, and downstream review handoffs",
        summary:
            "A Python media pipeline that transforms production records into clips, thumbnails, previews, metadata, and stakeholder-ready reports.",
        shortValue:
            "Automated fragmented media handoffs into repeatable processing and reporting workflows.",
        problem:
            "Production workflows involved scattered files, timecodes, metadata, and manual handoffs that made downstream review slower and less consistent.",
        solution:
            "Automated timecode processing, previews, thumbnails, watermarking, metadata extraction, structured storage, and Excel/CSV reporting.",
        impact:
            "Reduced production handoff effort by an estimated 50%.",
        cardOutcome:
            "Reduced production handoff effort by an estimated 50% through repeatable media and metadata automation.",
        thinkingLenses: ["Systems", "Data", "Engineering"],
        roleLens: ["systems", "data", "engineering"],
        proofPoints: [
            "Processed timecodes, previews, thumbnails, and output files with FFmpeg and FFprobe.",
            "Stored structured records in SQLite.",
            "Generated Excel and CSV reports with OpenPyXL and integrated Vimeo metadata.",
        ],
        impactStats: [
            {
                label: "Handoff Effort",
                value: "~50% Less",
            },
            {
                label: "Storage",
                value: "SQLite",
            },
            {
                label: "Pipeline",
                value: "Automated",
            },
        ],
        tools: [
            "Python",
            "SQLite",
            "FFmpeg",
            "FFprobe",
            "OpenPyXL",
            "Vimeo API",
        ],
        skills: [
            "Data Pipelines",
            "Automation",
            "Metadata Processing",
            "API Integration",
            "Reporting",
            "Media Processing",
            "Structured Data",
        ],
        cardTags: ["Python", "Pipeline", "Media", "Automation"],
        searchableTags: [
            "crucible",
            "python",
            "sqlite",
            "ffmpeg",
            "ffprobe",
            "openpyxl",
            "vimeo",
            "pipeline",
            "metadata",
            "automation",
        ],
        detailCta: "View Pipeline Project",
        sortDate: "2025-08",
        order: 5,
        caseStudy: {
            context:
                "Media-production handoffs frequently require files, metadata, timecodes, thumbnails, and reporting to move through several manual steps.",
            userNeed:
                "Production teams need consistent downstream deliverables without repeatedly rebuilding the same artifacts by hand.",
            constraints: [
                "Media inputs and metadata came from several formats.",
                "Outputs needed to remain useful for both machines and human review.",
            ],
            productDecisions: [
                "Focused the pipeline on automating repetitive handoffs with clear downstream value.",
            ],
            designDecisions: [
                "Produced review-friendly reports alongside machine-generated media outputs.",
            ],
            engineeringDecisions: [
                "Used FFmpeg and FFprobe for media processing.",
                "Used SQLite for structured records and OpenPyXL for spreadsheet reporting.",
                "Integrated Vimeo metadata through its API.",
            ],
            tradeoffs: [
                "Used an estimated impact metric because the project did not have production instrumentation for exact time savings.",
            ],
            nextSteps: [
                "Add stronger validation for malformed production inputs.",
                "Expand pipeline observability and failure reporting.",
            ],
        },
        links: {
            github: "",
            live: "",
        },
    },

    {
        id: "verychat",
        title: "VeryChat",
        subtitle: "Rust-Powered Desktop IRC Client",
        type: "Real-Time Messaging Product",
        displayType: "project",
        status: "Completed",
        featured: false,
        role: "Full-Stack Systems Developer",
        audience:
            "Users participating in live IRC conversations across channels and connection states",
        summary:
            "A cross-platform desktop IRC client built around reactive UI, event-driven architecture, and constantly changing messaging state.",
        shortValue:
            "A Rust-based messaging client exploring real-time connections, channel state, and reactive desktop interaction.",
        problem:
            "Messaging applications must keep conversations, channels, users, and connection state synchronized while remaining responsive.",
        solution:
            "Built an event-driven desktop client with Rust, Tauri, Leptos, and WebAssembly to manage live connection and messaging state.",
        impact:
            "Created a working systems-oriented product centered on real-time state, responsiveness, and cross-platform interaction.",
        cardOutcome:
            "Built a cross-platform messaging client around live state, reactive updates, and event-driven system behavior.",
        thinkingLenses: ["Systems", "Engineering", "UX/UI"],
        roleLens: ["systems", "engineering", "ux-ui"],
        proofPoints: [
            "Managed live connections, channels, messages, and user state.",
            "Built reactive UI behavior around event-driven updates.",
            "Used Rust, Tauri, Leptos, and WebAssembly for a cross-platform desktop stack.",
        ],
        impactStats: [
            {
                label: "Architecture",
                value: "Event-Driven",
            },
            {
                label: "Core Language",
                value: "Rust",
            },
            {
                label: "Platform",
                value: "Desktop",
            },
        ],
        tools: ["Rust", "Tauri", "Leptos", "WebAssembly"],
        skills: [
            "Event-Driven Architecture",
            "Real-Time State",
            "Reactive UI",
            "Rust",
            "Desktop Development",
            "Cross-Platform Development",
        ],
        cardTags: ["Rust", "Messaging", "Real-Time", "Desktop"],
        searchableTags: [
            "verychat",
            "rust",
            "tauri",
            "leptos",
            "webassembly",
            "irc",
            "messaging",
            "real-time",
            "event-driven",
            "desktop",
        ],
        detailCta: "View Systems Project",
        sortDate: "2026-01",
        order: 6,
        caseStudy: {
            context:
                "The project explored how a messaging product should behave when application state is continuously changing.",
            userNeed:
                "Users need connection, channel, and message changes to appear predictably without disrupting the conversation experience.",
            constraints: [
                "Messaging state changes asynchronously.",
                "The interface needed to react to events without becoming difficult to reason about.",
                "The product needed to run as a cross-platform desktop application.",
            ],
            productDecisions: [
                "Centered the product around core connection, channel, and messaging workflows.",
            ],
            designDecisions: [
                "Used reactive updates so state changes remained visible without manual refresh.",
            ],
            engineeringDecisions: [
                "Used Rust and Tauri for the desktop application foundation.",
                "Used Leptos and WebAssembly for reactive interface behavior.",
                "Structured system behavior around event-driven state transitions.",
            ],
            tradeoffs: [
                "Focused on robust real-time state handling rather than broad social-product functionality.",
            ],
            nextSteps: [
                "Expand channel and connection management.",
                "Strengthen resilience around reconnects and transient connection failures.",
            ],
        },
        links: {
            github: "",
            live: "",
        },
    },

    {
        id: "meditrain",
        title: "MediTrain",
        subtitle: "VR Medical Trainer",
        type: "Immersive Healthcare Training",
        displayType: "case-study",
        status: "Completed",
        featured: false,
        role: "Project Manager / Full-Stack VR Developer",
        audience:
            "Medical learners who need accessible practice with surgical procedures and measurable technique feedback",
        summary:
            "A VR knee-surgery training simulation combining immersive interactions, motion tracking, haptics, and performance feedback.",
        shortValue:
            "An immersive medical-training product designed to make procedural practice more accessible and measurable.",
        problem:
            "Hands-on procedural training can depend on expensive physical resources, specialized environments, and limited opportunities for repetition.",
        solution:
            "Built a MetaQuest training simulation with realistic tool interactions, inverse kinematics, haptics, motion tracking, and scoring.",
        impact:
            "Created a working training experience that evaluated incision accuracy, pressure control, and tool stability.",
        cardOutcome:
            "Built an immersive surgical-training experience with measurable feedback across three technique dimensions.",
        thinkingLenses: ["Product", "UX/UI", "Engineering", "Program"],
        roleLens: ["product", "ux-ui", "engineering"],
        proofPoints: [
            "Led project direction while contributing to the VR implementation.",
            "Built feedback around incision accuracy, pressure control, and tool stability.",
            "Integrated motion tracking, haptics, inverse kinematics, and interactive medical tools.",
        ],
        impactStats: [
            {
                label: "Feedback Areas",
                value: "3",
            },
            {
                label: "Platform",
                value: "MetaQuest",
            },
            {
                label: "Engine",
                value: "Unity",
            },
        ],
        tools: [
            "Unity",
            "C#",
            "MetaQuest",
            "Inverse Kinematics",
            "Haptics",
            "Motion Tracking",
        ],
        skills: [
            "Project Management",
            "VR Development",
            "Interaction Design",
            "Haptic Feedback",
            "Motion Tracking",
            "Scoring Systems",
            "Healthcare Simulation",
        ],
        cardTags: ["VR", "Healthcare", "Unity", "Training"],
        searchableTags: [
            "meditrain",
            "vr",
            "unity",
            "csharp",
            "metaquest",
            "haptics",
            "motion-tracking",
            "medical",
            "training",
            "simulation",
        ],
        detailCta: "View VR Case Study",
        sortDate: "2025-01",
        order: 7,
        caseStudy: {
            context:
                "The project explored how immersive simulation could make procedural practice more accessible without relying entirely on physical training resources.",
            userNeed:
                "Learners need opportunities to practice technique repeatedly and receive immediate feedback on how they perform.",
            constraints: [
                "Interactions needed to feel believable enough to support training.",
                "The experience needed measurable feedback rather than simulation alone.",
                "VR interaction quality depended on motion tracking, haptics, and tool behavior working together.",
            ],
            productDecisions: [
                "Focused the simulation on a knee-surgery training scenario with measurable technique feedback.",
                "Prioritized feedback dimensions that could make practice more actionable.",
            ],
            designDecisions: [
                "Designed interactions around realistic tool handling and immediate performance feedback.",
            ],
            engineeringDecisions: [
                "Used Unity and C# for the simulation.",
                "Integrated inverse kinematics, haptics, and motion tracking.",
                "Implemented scoring around incision accuracy, pressure control, and tool stability.",
            ],
            tradeoffs: [
                "Focused on a defined procedure rather than trying to build a general-purpose medical simulator.",
            ],
            nextSteps: [
                "Expand training scenarios and learner feedback.",
                "Test usability with more representative medical learners.",
                "Refine scoring against expert-defined performance criteria.",
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