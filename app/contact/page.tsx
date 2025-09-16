'use client';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen hero-bg py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Mail className="w-16 h-16 text-secondary-600 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-neutral-900 mb-4">Contact</h1>
          <p className="text-xl text-neutral-600">Response in 24 hours. Let's collaborate.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <ContactForm />
        </motion.div>
      </div>
    </main>
  );
}
