'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-neutral-200 fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-neutral-900">
            Gertech
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              Home
            </Link>
            <Link href="/calendar" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              Calendar
            </Link>
            <Link href="/contact" className="text-neutral-600 hover:text-neutral-900 transition-colors">
              Contact
            </Link>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-neutral-600 hover:text-neutral-900"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link href="/" className="block text-neutral-600 hover:text-neutral-900 py-2">
              Home
            </Link>
            <Link href="/calendar" className="block text-neutral-600 hover:text-neutral-900 py-2">
              Calendar
            </Link>
            <Link href="/contact" className="block text-neutral-600 hover:text-neutral-900 py-2">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
