'use client';
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/calendar", label: "Calendar" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-slate-900 text-lg tracking-tight">Gertech</Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium hover:text-slate-900 text-slate-600 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <button className="md:hidden p-2 rounded-xl border border-slate-200" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          {open ? <X size={18}/> : <Menu size={18}/>}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 grid gap-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="py-2" onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
