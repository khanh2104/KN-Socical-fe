# KN-Socical-fe

Front-end of KN Social built with React.js.

## Setup

1. Open a terminal in the repository root
2. Run `npm install`
3. Run `npm run dev`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Notes

- The app is designed as a React SPA with routes for feed, profile, friends, messages, notifications, and settings.
- API requests use `REACT_APP_API_BASE_URL` and default to `http://localhost:8080/api`.
- The structure is intentionally componentized and can be migrated to Next.js by converting pages into route components and moving API calls into `getServerSideProps` or client hooks.
