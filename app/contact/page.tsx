import NavBar from "@/components/NavBar";
import ContactForm from "@/components/ContactForm";
export const metadata = { title: "Gertech — Contact" };
export default function ContactPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-6xl mx-auto px-4">
        <section className="py-12">
          <h1 className="text-3xl font-bold">Contact German</h1>
          <p className="text-slate-600 mt-2">Tell me what you need and your preferred timing. I'll get back to you within 24 hours.</p>
          <ContactForm />
        </section>
      </main>
    </>
  );
}
