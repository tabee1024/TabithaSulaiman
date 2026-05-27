# Tabitha Sulaiman Portfolio

This is my full-stack MERN portfolio project.

I am building this portfolio to present my work across product thinking, UI/UX design, and software engineering. The project is being developed in working checkpoints, starting with planning documentation and growing into a full-stack application.

## Live Site

[View my portfolio](https://www.tabithasulaiman.com)

Backup Vercel URL:

[View Vercel deployment](https://tabitha-sulaiman.vercel.app)

## Current Version

**v2.2 UI Improvements made across project view, systems, design. and engineering thinking.**

Current production features:

- React + Vite frontend deployed on Vercel.
- Custom domain connected through Cloudflare.
- Express + Node backend deployed on Render.
- MongoDB Atlas stores contact submissions.
- Resend sends contact notification emails.
- Vercel rewrites `/api/*` requests to the Render backend.
- Protected admin dashboard supports message review and follow-up management.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- CSS custom properties
- Organized CSS files
- HitchCut display font
- Montserrat body font

### Backend

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Resend
- JWT-based admin authentication
- httpOnly admin session cookie

### Deployment and Infrastructure

- Vercel for frontend hosting
- Render for backend hosting
- MongoDB Atlas for database hosting
- Resend for email notifications
- Cloudflare for domain registration and DNS
- Custom domain: `https://www.tabithasulaiman.com`

## Project Goals

- Present my project work clearly and professionally.
- Show product thinking, UI/UX judgment, and engineering ability.
- Explain design and technical decisions through usability, readability, accessibility, and security.
- Build a real full-stack contact system instead of a static form.
- Use responsible environment variable handling and deployment practices.
- Create an admin workflow for reviewing and managing contact submissions.

## Full-Stack Architecture

My portfolio is deployed as a full-stack MERN application.

Frontend flow:

```txt
Visitor
- www.tabithasulaiman.com
- Vercel frontend
- /api/contact
- Vercel rewrite
- Render backend
```

## UI Structure Polish

### Project Detail Pages

Project detail pages are structured in layers:

- Project hero for title, summary, and quick orientation.
- Snapshot panel for role, status, and audience.
- Overview card for thinking lenses, project stats, problem, solution, impact, tools, and skills.
- Decision log for deeper case study sections, including context, user need, constraints, product decisions, design decisions, engineering decisions, tradeoffs, and next steps.

This structure helps visitors scan quickly first, then go deeper when they want to understand the reasoning behind the work.

Current version: v2.4 Project detail pages redesigned.