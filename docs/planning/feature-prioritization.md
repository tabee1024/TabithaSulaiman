# Feature Prioritization

## Purpose

This document explains how I am prioritizing the features for my portfolio.

I am treating this portfolio like a product, not just a personal website. That means I am starting with the most important features first, building in working checkpoints, and saving advanced features for later iterations.

The goal is to create a portfolio that clearly presents who I am, how I think, what I build, and how I connect product, design, and engineering decisions.

## Priority Scale

P0 = Required for the first working version  
P1 = Important after the first version works  
P2 = Nice to have later  

## P0: First Working Version

These features are required for the first working version of the portfolio.

The purpose of P0 is to create a live, readable, professional version of the portfolio that explains who I am, what I build, and how I think.

### P0 Features

- GitHub repository
- Project folder structure
- React frontend
- Homepage
- About section
- Projects page
- Static project data in React
- Project cards
- Basic case study layout
- Contact page layout
- Responsive CSS foundation
- README file
- First frontend deployment

### Why P0 Comes First

P0 comes first because the portfolio needs a working foundation before advanced full-stack features are added.

This version should answer the most important visitor questions:

- Who am I?
- What types of roles am I targeting?
- What projects have I worked on?
- How do I think through product, design, and engineering decisions?
- How can someone contact me?

## P1: Full-Stack Version

These features make the portfolio a real MERN application.

The purpose of P1 is to connect the frontend to a backend, store contact messages in a database, and show that I can build beyond static pages.

### P1 Features

- Express backend
- MongoDB Atlas setup
- Contact form API route
- Contact message model
- Save contact messages to MongoDB
- Environment variable setup
- Backend deployment
- Connect deployed frontend to deployed backend
- Security checklist

### Why P1 Comes After P0

P1 comes after P0 because the portfolio should first work as a clear frontend experience.

Once the pages, project cards, and design direction are working, the backend can be added with more focus and less confusion.

This also helps me test the project in smaller checkpoints instead of trying to build everything at once.

## P2: Advanced Version

These features can come after the main portfolio and full-stack contact form are working.

The purpose of P2 is to improve maintainability, admin control, and long-term scalability.

### P2 Features

- Admin dashboard
- Admin authentication
- Add new projects from dashboard
- Edit projects from dashboard
- Delete projects from dashboard
- Store project data in MongoDB
- More advanced animations
- Privacy-friendly analytics
- GitHub Releases
- More detailed case studies
- Accessibility improvements
- Performance improvements

### Why P2 Comes Later

P2 features are valuable, but they are not required for the first polished version.

Some P2 features, especially admin authentication and project editing, require extra security planning. I want to build them carefully instead of rushing them.

## Current Build Strategy

The project will begin with project data stored in a JavaScript file inside the React frontend.

This file will likely be:

```text
client/src/data/projects.js