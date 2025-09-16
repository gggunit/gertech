'use client';
import { useEffect, useState } from "react";

type Event = { 
  id: string; 
  summary: string; 
  start: string; 
  end: string; 
  location?: string; 
  htmlLink?: string; 
};

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/calendar")
      .then((r) => r.json())
      .then((d) => { 
        setEvents(d.events || []); 
        if (d.error) setError(d.error); 
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="glass-card text-center">
      <p className="text-neutral-600">Loading calendar events...</p>
    </div>
  );
  
  if (error) return (
    <div className="glass-card border-red-200 bg-red-50">
      <p className="text-red-600">Calendar error: {error}</p>
    </div>
  );
  
  if (!events.length) return (
    <div className="glass-card text-center">
      <p className="text-neutral-600">No upcoming events found.</p>
    </div>
  );

  return (
    <div className="glass-card">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Upcoming Availability</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="rounded-xl border border-neutral-200 p-4 bg-white">
            <h3 className="font-semibold text-neutral-900">{event.summary}</h3>
            <p className="text-sm text-neutral-600 mt-1">
              {formatDateTime(event.start, event.end)}
              {event.location ? ` · ${event.location}` : ""}
            </p>
            {event.htmlLink && (
              <a 
                className="text-sm text-primary-600 hover:text-primary-700 underline mt-2 inline-block" 
                href={event.htmlLink} 
                target="_blank" 
                rel="noreferrer"
              >
                Open in Google Calendar
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDateTime(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const sameDay = startDate.toDateString() === endDate.toDateString();
  
  const startStr = startDate.toLocaleString([], { 
    dateStyle: "medium", 
    timeStyle: "short" 
  });
  const endStr = endDate.toLocaleString([], { 
    dateStyle: sameDay ? undefined : "medium", 
    timeStyle: "short" 
  });
  
  return sameDay ? `${startStr} – ${endStr}` : `${startStr} → ${endStr}`;
}
