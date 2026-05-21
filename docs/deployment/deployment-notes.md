# Deployment Notes

## Purpose

This document defines the deployment strategy for the portfolio.

For deployment I will have checkpoints rather than deploying at the end. This enables my project to be easier to test, debug, and improve over time as I make adjustments.

## Deployment Approach

Like stated earlier, I'm not waiting until the entire application is finished before deploying.

Here are the following stages of deployment:

1. Frontend preview
2. Full-stack contact form
3. Polished portfolio release

This approach gives me working versions throughout the build instead of one large final launch.

## Deployment 1: Frontend Preview

The first deployment happens after the homepage, design system, and project card layout work locally.

The goal is to confirm that the visual direction, layout, and navigation work outside of my local machine.

This version proves that the frontend can build successfully and gives me an early live link for testing across screen sizes.

## Deployment 2: Full-Stack Contact Form

The second deployment happens after the backend, MongoDB connection, and contact form work locally.

The goal is to confirm that the frontend can communicate with the backend in production and that contact form submissions save correctly.

This version proves that the project is no longer only a static portfolio. It becomes a deployed MERN application with real data flow.

## Deployment 3: Polished Portfolio Release

The final deployment happens after the main content, case studies, responsive layout, security review, and documentation are polished.

The goal is to create a version that is ready to share professionally.

## Planned Deployment Stack

Frontend:

- Vercel or Netlify

Backend:

- Render or Railway

Database:

- MongoDB Atlas

Repository:

- GitHub

## Environment Variables

Private runtime values will be stored inside deployment platform’s environment variable settings.

The repository will only include placeholder examples.

**Keeping the deployed application configurable without exposing private values in the codebase.

## Deployment Review

Pre-Deployment Checklist:

- App builds without errors
- Correct branch is being deployed
- Environment variables are set in the platform
- Live site loads correctly
- Forms and links work
- Private Files in .gitignore & no credentials exposed
- README is updated and reflects current project status