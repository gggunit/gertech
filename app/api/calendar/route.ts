import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.GOOGLE_API_KEY;
  const calId = process.env.GOOGLE_CALENDAR_ID;
  if (!key || !calId) {
    return NextResponse.json({ events: [], error: "Missing GOOGLE_API_KEY or GOOGLE_CALENDAR_ID" });
  }
  const now = new Date();
  const timeMin = now.toISOString();
  const timeMax = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 60).toISOString(); // +60 days
  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calId)}/events`);
  url.searchParams.set("key", key);
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("timeMin", timeMin);
  url.searchParams.set("timeMax", timeMax);
  const r = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!r.ok) return NextResponse.json({ events: [], error: `Google API error (${r.status})` });
  const data = await r.json();
  const events = (data.items ?? []).map((e: any) => ({
    id: e.id,
    summary: e.summary ?? "Untitled",
    start: e.start?.dateTime ?? e.start?.date,
    end: e.end?.dateTime ?? e.end?.date,
    location: e.location,
    htmlLink: e.htmlLink,
  }));
  return NextResponse.json({ events });
}
