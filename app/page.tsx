import NavBar from "@/components/NavBar";
import Link from "next/link";
export const metadata = { title: "Gertech — Tech, Automation & Handiwork" };

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="max-w-6xl mx-auto px-4">
        <section className="py-14">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Gertech — Tech, Automation & Handiwork</h1>
          <p className="mt-4 text-lg text-slate-600">Friendly, skilled help for your digital life and your home — from AI automations and calendar ops to mounting, fixes, and plant care.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/calendar" className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3">View Calendar</Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 hover:bg-slate-50">Contact</Link>
          </div>
        </section>
        <section className="py-10 grid md:grid-cols-3 gap-6">
          {[
            ["AI & Automation", "Inbox rules, calendar flows, Shortcuts, content ops, HomeKit/Nest."],
            ["Tech Support (Remote/Onsite)", "Cleanups, backups, wifi optimization, security hygiene."],
            ["Mounting & Repairs", "TVs, art, shelves; stud-safe installs and tidy finish."],
          ].map(([t,d]) => (
            <div key={t} className="rounded-2xl border border-slate-200 p-6 hover:shadow transition">
              <h3 className="font-semibold">{t}</h3>
              <p className="text-sm text-slate-600 mt-2">{d}</p>
            </div>
          ))}
        </section>
      </main>
      <footer className="mt-16 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-slate-600">© {new Date().getFullYear()} Gertech</div>
      </footer>
    </>
  );
}
