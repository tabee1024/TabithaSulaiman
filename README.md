# Tabitha Sulaiman Portfolio

This is my full-stack MERN portfolio project.

I am building this portfolio to present my work across product thinking, UI/UX design, and software engineering. The project is being developed in working checkpoints, starting with planning documentation and growing into a full-stack application.

## Live Site

[View my portfolio](https://tabitha-sulaiman.vercel.app/)

## Current Status

v0.8 Frontend preview deployed

Frontend is deployed as an early live preview. Currently, I have the routing, project cards, project detail pages, case study structure, systems thinking content, and a frontend contact form down.

This is all a basic preview so the backend, database, API proxy, email notifications, chat-style contact widget, and admin features are planned for the later build phases I have in store.

## Current Hosting Plan

The current deployment plan uses a free-first setup:

- Vercel frontend
- Render backend free plan
- MongoDB Atlas free plam
- Resend free plan
- Custom domain: Few bucks a year

Driving cost for my portfolio will be for the custom domain. Depending on futher implimentation down the line, I may consider upgrading Render due to the contact form's interaction with the Database.

## Tech Stack Planned

- MongoDB
- Express
- React
- Node.js

## Current Frontend Stack

- React
- Vite
- React Router
- CSS custom properties
- Google Fonts for beta version

## Project Goals

- Present my project work clearly
- Explain my product, design, and engineering decisions
- Build a full-stack contact form
- Document my process professionally
- Practice secure project setup with environment variables

## Frontend Commands

From `client` folder:

```bash
npm install
npm run dev
npm run build
npm run preview
```
## Backend Status

The backend is currently being built with Express and Node.js.

Current API Routes:

- `GET /api/health`
- `POST /api/contact`

Milestone 1: Backend successfully connects to MongoDB Atlas (locally) through Mongoose. Contact message storage, email notifications, production API proxying, and admin features are planned for later steps.

## Security Note

Private credentials, API keys, database passwords, and environment variables are to be protected.