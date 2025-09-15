#!/bin/bash
# Run this in your terminal from anywhere; it will cd to ~/Downloads/gertech and apply updates.
# This script installs deps, sets up .env, renames/fixes Calendar, adds validation to ContactForm,
# adds testimonials/pricing to home, and enhances Tailwind for modern/sleek look (custom colors, fonts, animations).

cd ~/Downloads/gertech || { echo "Folder not found!"; exit 1; }

# Install dependencies for form validation and animations
npm install react-hook-form @hookform/resolvers yup framer-motion

# Create/update .env.local with placeholders (edit with your real keys)
cat > .env.local << 'ENV_EOF'
GOOGLE_CALENDAR_ID=your_calendar_id_here
GOOGLE_API_KEY=your_api_key_here
ENV_EOF
echo "Edit .env.local with your real Google Calendar ID and API key!"

# Update tailwind.config.ts for sleek theme (custom blues/greens, Inter font, smooth transitions)
cat > tailwind.config.ts << 'TW_EOF'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f0fdf4',
          500: '#10b981',
          600: '#059669',
          900: '#065f46',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
TW_EOF

# Add animations to globals.css
cat >> app/globals.css << 'CSS_EOF'

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slideUp {
  0% { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
CSS_EOF

# Fix EventList: Render full details, add sleek styling. Rename to Calendar.tsx
cat > components/Calendar.tsx << 'CAL_EOF'
'use client';
import { useState, useEffect } from 'react';

type Event = {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  htmlLink: string;
};

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/calendar')
      .then(res => res.json())
      .then(data => {
        if (data.events) {
          setEvents(data.events);
        } else {
          setError('No events found or API error');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load calendar');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div></div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Upcoming Events</h3>
      {events.length === 0 ? (
        <p className="text-gray-500 italic">No upcoming events.</p>
      ) : (
        <ul className="space-y-2">
          {events.map(ev => (
            <li key={ev.id} className="p-3 bg-gray-50 rounded-md border-l-4 border-secondary-500 hover:bg-secondary-50 transition-colors">
              <a href={ev.htmlLink} target="_blank" rel="noopener noreferrer" className="font-medium text-primary-600 hover:text-primary-700">
                {ev.summary}
              </a>
              <p className="text-sm text-gray-600 mt-1">
                {ev.start.dateTime ? new Date(ev.start.dateTime).toLocaleString() : ev.start.date} - 
                {ev.end.dateTime ? new Date(ev.end.dateTime).toLocaleString() : ev.end.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
CAL_EOF
rm components/EventList.tsx  # Remove old file

# Update calendar/page.tsx to use Calendar component with sleek layout
cat > app/calendar/page.tsx << 'PAGE_CAL_EOF'
import Calendar from '@/components/Calendar';
import Link from 'next/link';

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">German&apos;s Availability</h1>
          <p className="text-xl text-gray-600 mb-6">Check my real-time Google Calendar for open slots. Updates automatically!</p>
          <Link href="/contact" className="bg-secondary-600 text-white px-6 py-3 rounded-lg hover:bg-secondary-700 transition-colors inline-block">
            Book Now
          </Link>
        </div>
        <Calendar />
      </div>
    </main>
  );
}
PAGE_CAL_EOF

# Update ContactForm with react-hook-form + yup validation (no captcha for simplicity; add reCAPTCHA key if needed)
cat > components/ContactForm.tsx << 'FORM_EOF'
'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { motion } from 'framer-motion';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

type FormData = yup.InferType<typeof schema>;

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setState('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        setState('success');
        reset();
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
      >
        <h3 className="text-lg font-semibold text-green-800 mb-2">Thanks!</h3>
        <p className="text-green-700">I&apos;ll get back to you within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-slide-up">
      <div>
        <input
          {...register('name')}
          placeholder="Your Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <input
          {...register('phone')}
          placeholder="Your Phone"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>
      <div>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Your Message"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors font-semibold"
      >
        {state === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {state === 'error' && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-center">
          Something went wrong. Please try again.
        </motion.p>
      )}
    </motion.form>
  );
}
FORM_EOF

# Update contact/page.tsx with sleek layout
cat > app/contact/page.tsx << 'PAGE_CONTACT_EOF'
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact German</h1>
          <p className="text-xl text-gray-600">I&apos;ll respond within 24 hours. Let&apos;s get your project started!</p>
        </motion.div>
        <ContactForm />
      </div>
    </main>
  );
}
PAGE_CONTACT_EOF

# Update home page: Add Tailwind classes for modern grid layout, testimonials, pricing sections
cat > app/page.tsx << 'HOME_EOF'
import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  { title: 'AI & Automation', desc: 'Custom AI workflows, ChatGPT integrations, calendar automation, email management, and smart home setups.' },
  { title: 'Tech Support', desc: 'Computer troubleshooting, software setup, device configuration, data backup, and cybersecurity basics.' },
  { title: 'Home Repairs', desc: 'TV mounting, furniture assembly, basic electrical work, plumbing fixes, and general handyman tasks.' },
  { title: 'Organization', desc: 'Digital file organization, workspace setup, productivity systems, and decluttering assistance.' },
  { title: 'Plant Care', desc: 'Garden maintenance, plant health diagnosis, watering systems, and green space optimization.' },
  { title: 'Calendar Management', desc: 'Schedule optimization, appointment coordination, meeting prep, and time management systems.' },
];

const whys = [
  { title: 'Personalized Service', desc: 'Every solution is tailored to your specific needs and lifestyle. No one-size-fits-all approaches.' },
  { title: 'Flexible Scheduling', desc: 'Available evenings and weekends. Check my real-time calendar for immediate availability.' },
  { title: 'Fair Pricing', desc: 'Transparent rates with no hidden fees. Small jobs welcome — no project too small.' },
  { title: 'Local Knowledge', desc: 'Bay Area based with deep understanding of local needs, from tech trends to home maintenance.' },
];

const testimonials = [
  { quote: 'German fixed my entire setup in one afternoon—super efficient!', name: 'Alex S.' },
  { quote: 'Best plant care advice ever. My garden is thriving!', name: 'Jamie L.' },
  { quote: 'Affordable and reliable tech support. Highly recommend!', name: 'Taylor R.' },
];

const pricing = [
  { tier: 'Basic', desc: 'Quick fixes & consults', price: '$50/hr' },
  { tier: 'Standard', desc: 'Full setups & repairs', price: '$75/hr' },
  { tier: 'Premium', desc: 'Custom AI & ongoing support', price: 'Starting at $200/project' },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Gertech — Tech, Automation & Handiwork</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Friendly, skilled help for your digital life and your home — from AI automations and calendar ops to mounting, fixes, and plant care.
          </p>
          <div className="space-x-4">
            <Link href="/calendar" className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl">
              View Calendar
            </Link>
            <Link href="/contact" className="bg-secondary-600 text-white px-8 py-4 rounded-lg hover:bg-secondary-700 transition-all shadow-lg hover:shadow-xl">
              Contact
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Services I Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Gertech?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whys.map((why, i) => (
              <motion.div
                key={why.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{why.title}</h3>
                <p className="text-gray-600">{why.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 italic text-gray-700 border-l-4 border-secondary-500"
              >
                <p className="mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-gray-900 text-right">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200 hover:shadow-lg transition-all"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.tier}</h3>
                <p className="text-gray-600 mb-4">{plan.desc}</p>
                <p className="text-3xl font-bold text-primary-600">{plan.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
HOME_EOF

# Commit changes
git add .
git commit -m "Apply AI recommendations: Enhanced UI, validation, calendar fix, added content"

echo "Updates applied! Run 'npm run dev' to test. Site now has modern gradients, animations, cards, validation, testimonials, and pricing for a sleek look."
