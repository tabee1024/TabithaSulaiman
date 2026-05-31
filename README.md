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

### Navigation Bar Update

The public navigation now uses `Work` as the main label for the portfolio body of work, while the route remains `/projects`. This keeps the URL stable while making the experience broader than a project-only gallery.

The site uses a custom TS logo, Hitchcut as the self-hosted display font, Montserrat as the body font, and a warm neutral interface system designed around readability, scannability, and recruiter-centered navigation.

The browser metadata and favicon use the portfolio brand identity instead of the default Vite setup.