import NavBar from "@/components/NavBar";
import EventList from "@/components/EventList";
export const metadata = { title: "Gertech — Calendar" };
export default function CalendarPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-6xl mx-auto px-4">
        <section className="py-12">
          <h1 className="text-3xl font-bold">German's Availability</h1>
          <p className="text-slate-600 mt-2">View my real-time schedule and available time slots. Updated automatically from Google Calendar.</p>
          <div className="mt-2 text-sm text-slate-500">
            Need to schedule something? <a href="/contact" className="text-blue-600 hover:underline">Contact me</a> with your preferred times.
          </div>
          <div className="mt-6"><EventList /></div>
        </section>
      </main>
    </>
  );
}
