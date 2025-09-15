import NavBar from "@/components/NavBar";
import EventList from "@/components/EventList";
export const metadata = { title: "Gertech — Calendar" };
export default function CalendarPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-6xl mx-auto px-4">
        <section className="py-12">
          <h1 className="text-3xl font-bold">Upcoming availability</h1>
          <p className="text-slate-600 mt-2">Pulled directly from Google Calendar.</p>
          <div className="mt-6"><EventList /></div>
        </section>
      </main>
    </>
  );
}
