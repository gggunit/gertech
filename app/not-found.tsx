import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <NavBar />
      <main className="max-w-6xl mx-auto px-4">
        <section className="py-20 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
          <p className="text-slate-600 mb-6">The page you're looking for doesn't exist.</p>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 hover:bg-slate-800 transition-colors"
          >
            Go Home
          </Link>
        </section>
      </main>
    </>
  );
}
