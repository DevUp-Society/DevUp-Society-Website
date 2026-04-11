# DevUp Workspace

Internal task and activity tracking platform for DevUp members.

## Stack

- React 18 + Vite
- Firebase Auth with Google Sign-In
- Firestore for users, teams, tasks, updates, comments, and notifications
- Firebase Storage for attachments
- TailwindCSS with the same visual language as the public DevUp site

## Setup

1. Install dependencies inside this folder.
2. Copy `.env.example` to `.env` and fill in the Firebase config values.
3. Start the app with `npm run dev`.

## Admin Testing

1. Add your Google account email to `VITE_ADMIN_EMAILS` in `.env` (comma-separated for multiple).
2. Sign in with that Google account.
3. The first profile sync will assign `Admin` role automatically for that email.

If a user already exists and is not Admin, update the `users/{uid}` document in Firestore and set `role` to `Admin` manually.

## Firebase Data Model

- `users`
- `teams`
- `tasks`
- `updates`
- `comments`
- `notifications`

## Deployment

This workspace app is ready to deploy as a standalone Vercel project for `workspace.devupvjit.in`.
Use the included `vercel.json` rewrite so client-side routes resolve correctly.
