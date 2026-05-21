# Security Notes

## Purpose

This document defines the security decisions for my portfolio.

My portfolio is designed to be public, but the application still uses private configuration for database access, server behavior, and future admin features. The goal is to keep the repository safe to share while separating public code from private runtime values.

## Security Approach

The project follows three core rules:

1. Public code belongs in GitHub.
2. Private configuration belongs in environment variables.
3. Admin and database features require backend validation before they are deployed publicly.

This keeps the project understandable without exposing credentials or sensitive data.

## Environment Configuration

Runtime configuration is handled through environment variables.

The repository uses example files to document required variables without exposing real values.

Example:

```text
MONGO_URI=sample_db_uri
PORT=3000
JWT_SECRET=your_jwt_secret_here