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
            <Link href="/calendar" className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 hover:bg-slate-800 transition-colors">View Calendar</Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 hover:bg-slate-50 transition-colors">Contact</Link>
          </div>
        </section>

        <section className="py-12 border-t border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Services I Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-sm transition-shadow">
              <h3 className="font-semibold text-slate-900 mb-2">AI & Automation</h3>
              <p className="text-sm text-slate-600">Custom AI workflows, ChatGPT integrations, calendar automation, email management, and smart home setups.</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-sm transition-shadow">
              <h3 className="font-semibold text-slate-900 mb-2">Tech Support</h3>
              <p className="text-sm text-slate-600">Computer troubleshooting, software setup, device configuration, data backup, and cybersecurity basics.</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-sm transition-shadow">
              <h3 className="font-semibold text-slate-900 mb-2">Home Repairs</h3>
              <p className="text-sm text-slate-600">TV mounting, furniture assembly, basic electrical work, plumbing fixes, and general handyman tasks.</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-sm transition-shadow">
              <h3 className="font-semibold text-slate-900 mb-2">Organization</h3>
              <p className="text-sm text-slate-600">Digital file organization, workspace setup, productivity systems, and decluttering assistance.</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-sm transition-shadow">
              <h3 className="font-semibold text-slate-900 mb-2">Plant Care</h3>
              <p className="text-sm text-slate-600">Garden maintenance, plant health diagnosis, watering systems, and green space optimization.</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-sm transition-shadow">
              <h3 className="font-semibold text-slate-900 mb-2">Calendar Management</h3>
              <p className="text-sm text-slate-600">Schedule optimization, appointment coordination, meeting prep, and time management systems.</p>
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Choose Gertech?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Personalized Service</h3>
                <p className="text-sm text-slate-600">Every solution is tailored to your specific needs and lifestyle. No one-size-fits-all approaches.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Flexible Scheduling</h3>
                <p className="text-sm text-slate-600">Available evenings and weekends. Check my real-time calendar for immediate availability.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Fair Pricing</h3>
                <p className="text-sm text-slate-600">Transparent rates with no hidden fees. Small jobs welcome — no project too small.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Local Knowledge</h3>
                <p className="text-sm text-slate-600">Bay Area based with deep understanding of local needs, from tech trends to home maintenance.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="mt-16 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-slate-600">© {new Date().getFullYear()} Gertech</div>
      </footer>
    </>
  );
}
