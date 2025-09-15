# Gertech
Next.js 14 + Tailwind with Google Calendar integration at `/api/calendar`.

## Local dev
1) Set `.env.local`:
GOOGLE_CALENDAR_ID=your_calendar_id@group.calendar.google.com
GOOGLE_API_KEY=your_google_api_key

2) Run:
npm i
npm run dev

## Deploy
- GitHub via `gh` CLI
- Vercel via `npx vercel --prod` (or with VERCEL_TOKEN for non-interactive)
