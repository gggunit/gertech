import NavBar from "@/components/NavBar";
export const metadata = { title: "Gertech — Contact" };

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-6xl mx-auto px-4">
        <section className="py-12">
          <h1 className="text-3xl font-bold">Contact</h1>
          <p className="text-slate-600 mt-2">Tell me what you need and preferred timing.</p>
          <form className="grid gap-4 max-w-xl mt-6" action="mailto:you@example.com" method="post" encType="text/plain">
            <input required name="name" placeholder="Your name" className="rounded-xl border border-slate-300 px-4 py-3" />
            <input required type="email" name="email" placeholder="Email" className="rounded-xl border border-slate-300 px-4 py-3" />
            <input name="phone" placeholder="Phone (optional)" className="rounded-xl border border-slate-300 px-4 py-3" />
            <textarea required name="message" placeholder="What do you need help with?" className="rounded-xl border border-slate-300 px-4 py-3 min-h-[140px]" />
            <button className="rounded-2xl bg-black text-white px-5 py-3">Send</button>
          </form>
          <p className="text-sm text-slate-500 mt-3">We can swap to a server email route (Resend/SMTP) later for reliability.</p>
        </section>
      </main>
    </>
  );
}
