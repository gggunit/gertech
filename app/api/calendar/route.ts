import { NextResponse } from "next/server";

// Temporary mock data for testing
const mockEvents = [
  {
    id: "1",
    summary: "Available for consultation",
    start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    end: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
    location: "Video call",
  },
  {
    id: "2", 
    summary: "Tech support session",
    start: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Day after tomorrow
    end: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    location: "On-site or remote",
  }
];

export async function GET() {
  try {
    // For now, return mock data to test the frontend
    // Later, uncomment the Google Calendar integration below
    return NextResponse.json({ events: mockEvents });

    /* 
    // Google Calendar integration (commented out for testing)
    const calId = process.env.GOOGLE_CALENDAR_ID;
    const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
    
    if (!calId || !keyPath) {
      return NextResponse.json({ 
        events: mockEvents, 
        error: "Google Calendar not configured, showing mock data" 
      });
    }

    const { google } = require("googleapis");
    const path = require("path");

    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(keyPath),
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const now = new Date();
    const timeMin = now.toISOString();
    const timeMax = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 60).toISOString();

    const response = await calendar.events.list({
      calendarId: calId,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const items = response.data.items || [];
    const events = items.map((e) => ({
      id: e.id || '',
      summary: e.summary ?? "Untitled",
      start: e.start?.dateTime ?? e.start?.date ?? "",
      end: e.end?.dateTime ?? e.end?.date ?? "",
      location: e.location,
      htmlLink: e.htmlLink,
    }));

    return NextResponse.json({ events });
    */
    
  } catch (error) {
    console.error('Calendar API error:', error);
    return NextResponse.json({ 
      events: mockEvents, 
      error: `Falling back to mock data: ${error instanceof Error ? error.message : 'Unknown error'}` 
    });
  }
}
