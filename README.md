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
## Full-Stack Status

The React frontend is deployed on Vercel, and the Express backend is deployed on Render with MongoDB Atlas connected through Mongoose.

Current backend routes:

- `GET /api/health` confirms the backend server is running.
- `POST /api/contact` validates contact form submissions and saves messages to MongoDB Atlas.

Current frontend behavior:

- Contact form collects name, email, and message.
- The form validates required fields before submitting.
- The form currently sends submissions to the backend API.
- Successful submissions are saved in MongoDB Atlas.
- The public contact endpoint returns a minimal success or error response.

Environment variables are managed through local `.env` files and deployment platform settings. The real MongoDB connection string is stored only in `server/.env` locally and in Render environment variables for production. It is not committed to GitHub.

Current version: v1.3 Backend deployed on Render.
## Security Note

## Production Environment Variables

The backend uses environment variables so credentials and deployment-specific settings stay out of the codebase.

Local backend variables are stored in appropriate files, which is not committed to GitHub. Production backend variables are stored in Render.

Required backend variables:

- `MONGODB_URI` connects the Express backend to MongoDB Atlas.
- `CLIENT_ORIGIN` controls which frontend origin is allowed to call the backend from the browser.

The deployed Render backend uses MongoDB Atlas Network Access rules that allow Render outbound IPs/CIDR ranges instead of allowing access from anywhere.

The frontend does not store or receive the MongoDB connection string. Public contact submissions return a minimal success or error response only.

Current ver: v1.4 Production environment variables verified.