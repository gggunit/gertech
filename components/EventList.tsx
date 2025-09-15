'use client';
import { useEffect, useState } from "react";
type Event = { id: string; summary: string; start: string; end: string; location?: string; htmlLink?: string; };

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/calendar")
      .then((r) => r.json())
      .then((d) => { setEvents(d.events || []); if (d.error) setError(d.error); })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-600">Loading events…</p>;
  if (error) return <p className="text-red-600">Calendar error: {error}</p>;
  if (!events.length) return <p className="text-slate-600">No upcoming events found.</p>;

  return (
    <ul className="space-y-4">
      {events.map((ev) => (
        <li key={ev.id} className="rounded-2xl border border-slate-200 p-4 bg-white">
          <h3 className="font-semibold">{ev.summary}</h3>
          <p className="text-sm text-slate-600">{fmt(ev.start, ev.end)}{ev.location ? ` · ${ev.location}` : ""}</p>
          {ev.htmlLink && <a className="text-sm text-blue-700 underline mt-1 inline-block" href={ev.htmlLink} target="_blank" rel="noreferrer">Open in Google Calendar</a>}
        </li>
      ))}
    </ul>
  );
}
function fmt(start: string, end: string) {
  const s = new Date(start), e = new Date(end);
  const same = s.toDateString() === e.toDateString();
  const ds = s.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  const de = e.toLocaleString([], { dateStyle: same ? undefined : "medium", timeStyle: "short" });
  return same ? `${ds} – ${de}` : `${ds} → ${de}`;
}
