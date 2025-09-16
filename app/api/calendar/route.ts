import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Mock data for testing
const MOCK_EVENTS = [
  { id: '1', summary: 'Available Slot', start: { dateTime: '2025-09-16T09:00:00' }, end: { dateTime: '2025-09-16T10:00:00' }, htmlLink: '#' },
  { id: '2', summary: 'Busy', start: { dateTime: '2025-09-16T10:00:00' }, end: { dateTime: '2025-09-16T11:00:00' }, htmlLink: '#' },
];

export async function GET() {
  try {
    if (!process.env.GOOGLE_CALENDAR_ID || !process.env.GOOGLE_API_KEY) {
      console.log('Using mock data for calendar');
      return NextResponse.json({ events: MOCK_EVENTS });
    }

    const calendar = google.calendar({ version: 'v3' });
    const res = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      key: process.env.GOOGLE_API_KEY,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = res.data.items || [];
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Calendar API error:', error);
    return NextResponse.json({ error: 'Failed to fetch events', events: MOCK_EVENTS }, { status: 500 });
  }
}
