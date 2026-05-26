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

My portfolio is deployed as a full-stack MERN application.

Frontend:
- React + Vite frontend hosted on Vercel.
- Production domain: `https://www.tabithasulaiman.com`
- Vercel rewrites `/api/*` requests to the Render backend.

Backend:
- Express + Node backend hosted on Render.
- MongoDB Atlas connected through Mongoose.
- Resend sends contact notification emails.

Current backend routes:
- `GET /api/health` confirms the backend server is running.
- `POST /api/contact` validates contact form submissions, saves messages to MongoDB Atlas, and sends a contact notification email through Resend.

Security and privacy:
- Real secrets such as `MONGODB_URI` and `RESEND_API_KEY` are stored only in local `.env` files or deployment platform environment variables.
- The public contact endpoint returns a minimal success or error response.
- Contact submissions are used only to respond to messages.
- No public admin routes are exposed.

Current Ver: v1.7 Custom domain connected.

## Production Environment Variables

The backend uses environment variables so credentials and deployment-specific settings stay out of the codebase.

Local backend variables are stored in appropriate files, which is not committed to GitHub. Production backend variables are stored in Render.

Required backend variables:

- `MONGODB_URI` connects the Express backend to MongoDB Atlas.
- `CLIENT_ORIGIN` controls which frontend origin is allowed to call the backend from the browser.

The deployed Render backend uses MongoDB Atlas Network Access rules that allow Render outbound IPs/CIDR ranges instead of allowing access from anywhere.

The frontend does not store or receive the MongoDB connection string. Public contact submissions return a minimal success or error response only.

Current ver: v1.4 Production environment variables verified.

## Admin Authentication

My portfolio includes a protected admin dashboard for reviewing contact submissions.

Admin routes:

- `POST /api/admin/login` verifies admin creds and creates an httpOnly admin session cookie.
- `GET /api/admin/messages` returns recent contact messages only when the admin session is valid.
- `POST /api/admin/logout` clears the admin session cookie.

Admin secrets are stored only in local `.env` files and Render environment variables.

### Frontend Dependencies

The frontend lives in `client/`.

Core packages:

- `@vitejs/plugin-react` supports React inside the Vite build system.
- `vite` runs the frontend development server and creates the production build.
- `react` powers the component-based UI.
- `react-dom` renders React into the browser.
- `react-router-dom` handles client-side routing for pages like Home, Projects, Contact, and Admin.

Development and code-quality packages:

- `eslint` checks frontend code for common JavaScript and React issues.
- `@eslint/js` provides ESLint’s core JavaScript rules.
- `eslint-plugin-react-hooks` helps enforce correct React Hooks usage.
- `eslint-plugin-react-refresh` supports safer React Fast Refresh behavior during development.
- `globals` provides predefined global variables for linting.

### Backend Dependencies

The backend lives in `server/`.

Core packages:

- `express` runs the Node backend API.
- `mongoose` connects the backend to MongoDB Atlas and defines database models.
- `cors` controls which frontend origins can call the backend from the browser.
- `dotenv` loads local environment variables from `server/.env`.
- `resend` sends contact notification emails after a message is saved.

Admin authentication packages:

- `bcryptjs` hashes and verifies the admin password without storing the plain password.
- `jsonwebtoken` signs and verifies admin authentication tokens.
- `cookie-parser` allows the Express backend to read authentication cookies.

Development packages:

- `nodemon` restarts the backend automatically during local development.

### Dependency Security Notes

Real secrets are never stored in dependency files or committed to GitHub.

Sensitive values such as `MONGODB_URI`, `RESEND_API_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and `JWT_SECRET` are stored only in local `.env` files or deployment platform environment variables.

The frontend does not receive database credentials, email service keys, admin credentials, or JWT secrets as expected.

## Security Note

Credentials protected in appropriate file storage and placeholders.