# Tabitha Sulaiman Portfolio

This is my full-stack MERN portfolio project.

I built this portfolio to present my work across product thinking, UI/UX design, software engineering, and systems thinking. The project started as a frontend portfolio and has grown into a deployed full-stack application with a custom domain, contact system, email notifications, protected admin tools, and a polished project-viewing experience.

## Live Site

[View my portfolio](https://www.tabithasulaiman.com)

Backup Vercel URL:

[View Vercel deployment](https://tabitha-sulaiman.vercel.app)

## Current Version

**v2.4.0: Started resembling figma mockup design more**

Current production features:

- React + Vite frontend deployed on Vercel.
- Custom domain connected through Cloudflare.
- Express + Node backend deployed on Render.
- MongoDB Atlas stores contact submissions.
- Resend sends contact notification emails.
- Vercel rewrites `/api/*` requests to the Render backend.
- Protected admin dashboard supports message review and follow-up management.
- Project and work views are being redesigned around product, systems, design, and engineering thinking.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- CSS custom properties
- Organized CSS files
- Hitchcut display font
- Montserrat body font


### Front-End Updates^^
#### Systems Thinking Page

The Systems Thinking page explains how I connect user needs, interface decisions, data flow, technical constraints, security, documentation, and iteration loops.

The page now includes:

- A working definition of systems thinking.
- A thinking stack for workflow mapping, data flow, tradeoffs, and iteration.
- Applied examples from my portfolio.
- Tradeoff cards that explain how I make product and engineering decisions.
- A related Work CTA that connects systems thinking back to project evidence.

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
- Show product thinking, UI/UX judgment, systems thinking, and engineering ability.
- Explain design and technical decisions through usability, readability, accessibility, and security.
- Build a real full-stack contact system instead of a static form.
- Use responsible environment variable handling and deployment practices.
- Create an admin workflow for reviewing and managing contact submissions.
- Make the project-viewing experience useful for people reviewing my work across product, design, and engineering lenses.

## Full-Stack Architecture

My portfolio is deployed as a full-stack MERN application.

Frontend request flow:

```txt
Visitor
→ www.tabithasulaiman.com
→ Vercel frontend
→ /api/contact
→ Vercel rewrite
→ Render backend

