import { NextResponse } from "next/server";
import { google } from "googleapis";
import path from "path";

type GCalApiEvent = {
  id: string;
  summary?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
  location?: string;
  htmlLink?: string;
};

export async function GET() {
  const calId = process.env.GOOGLE_CALENDAR_ID;
  const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
  
  if (!calId || !keyPath) {
    return NextResponse.json({ 
      events: [], 
      error: "Missing GOOGLE_CALENDAR_ID or GOOGLE_SERVICE_ACCOUNT_KEY_PATH" 
    });
  }

  try {
    // Initialize Google Auth with service account
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(keyPath),
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const now = new Date();
    const timeMin = now.toISOString();
    const timeMax = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 60).toISOString(); // +60 days

    const response = await calendar.events.list({
      calendarId: calId,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const items: GCalApiEvent[] = response.data.items || [];

    const events = items.map((e) => ({
      id: e.id || '',
      summary: e.summary ?? "Untitled",
      start: e.start?.dateTime ?? e.start?.date ?? "",
      end: e.end?.dateTime ?? e.end?.date ?? "",
      location: e.location,
      htmlLink: e.htmlLink,
    }));

    return NextResponse.json({ events });
    
  } catch (error) {
    console.error('Calendar API error:', error);
    return NextResponse.json({ 
      events: [], 
      error: `Service account authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    });
  }
}
