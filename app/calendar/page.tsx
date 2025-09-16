import Calendar from '@/components/Calendar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarPage() {
  return (
    <main className="min-h-screen hero-bg py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <CalendarIcon className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-5xl font-bold text-neutral-900 mb-4">Availability</h1>
          <p className="text-xl text-neutral-600 mb-8">Real-time Google Calendar. Book seamlessly.</p>
          <Link href="/contact" className="cta-button">
            Book Appointment
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Calendar />
        </motion.div>
      </div>
    </main>
  );
}
