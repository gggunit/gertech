'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Monitor, Tools, Folder, Leaf, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

const services = [
  { title: 'AI & Automation', desc: 'Custom AI workflows, ChatGPT integrations, calendar automation, email management, and smart home setups.', icon: Brain },
  { title: 'Tech Support', desc: 'Computer troubleshooting, software setup, device configuration, data backup, and cybersecurity basics.', icon: Monitor },
  { title: 'Home Repairs', desc: 'TV mounting, furniture assembly, basic electrical work, plumbing fixes, and general handyman tasks.', icon: Tools },
  { title: 'Organization', desc: 'Digital file organization, workspace setup, productivity systems, and decluttering assistance.', icon: Folder },
  { title: 'Plant Care', desc: 'Garden maintenance, plant health diagnosis, watering systems, and green space optimization.', icon: Leaf },
  { title: 'Calendar Management', desc: 'Schedule optimization, appointment coordination, meeting prep, and time management systems.', icon: Calendar },
];

const whys = [
  { title: 'Personalized Service', desc: 'Every solution tailored to your needs. No cookie-cutter approaches.', icon: '✨' },
  { title: 'Flexible Scheduling', desc: 'Evenings, weekends—check real-time availability.', icon: '🕒' },
  { title: 'Fair Pricing', desc: 'Transparent, no hidden fees. Small jobs welcome.', icon: '💰' },
  { title: 'Local Expertise', desc: 'Bay Area pro with deep tech and home knowledge.', icon: '📍' },
];

const testimonials = [
  { quote: 'German transformed my setup—efficient and genius!', name: 'Alex S.', role: 'Tech Enthusiast' },
  { quote: 'Revived my garden like magic. Thriving now!', name: 'Jamie L.', role: 'Homeowner' },
  { quote: 'Reliable, affordable support. 10/10 recommend!', name: 'Taylor R.', role: 'Entrepreneur' },
];

const pricing = [
  { tier: 'Basic', desc: 'Quick fixes & consults', price: '$50/hr', features: ['1-hour session', 'Email support'] },
  { tier: 'Standard', desc: 'Full setups & repairs', price: '$75/hr', features: ['On-site visits', 'Follow-up'] },
  { tier: 'Premium', desc: 'Custom AI & ongoing', price: 'From $200/project', features: ['Full automation', 'Monthly check-ins'] },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen">
      {/* Navigation */}
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-bg relative overflow-hidden py-32 px-4">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-6xl md:text-7xl font-bold text-neutral-900 mb-6 leading-tight"
          >
            Gertech
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-neutral-600 mb-10 max-w-3xl mx-auto"
          >
            Premium tech, automation & handiwork. Elevate your digital life and home with expert, personalized service.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/calendar" className="cta-button">
              View Availability
            </Link>
            <Link href="/contact" className="cta-button bg-neutral-900 hover:bg-neutral-800">
              Get Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            className="text-4xl font-bold text-center text-neutral-900 mb-16"
          >
            Services
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card text-center"
                whileHover={{ scale: 1.02 }}
              >
                <service.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-neutral-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            className="text-4xl font-bold text-center text-neutral-900 mb-16"
          >
            Why Gertech?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whys.map((why, i) => (
              <motion.div
                key={why.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all"
              >
                <div className="text-3xl mb-3">{why.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{why.title}</h3>
                <p className="text-neutral-600">{why.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            className="text-4xl font-bold text-center text-neutral-900 mb-16"
          >
            Client Love
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card italic text-neutral-700 p-8"
              >
                <p className="mb-6 text-lg">"{testimonial.quote}"</p>
                <div className="text-right">
                  <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                  <p className="text-neutral-500 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            className="text-4xl font-bold text-center text-neutral-900 mb-16"
          >
            Transparent Pricing
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, i) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card text-center p-8 border-t-4 border-primary-500"
              >
                <h3 className="text-2xl font-bold mb-2">{plan.tier}</h3>
                <p className="text-4xl font-bold text-primary-600 mb-4">{plan.price}</p>
                <p className="text-neutral-600 mb-6">{plan.desc}</p>
                <ul className="text-left space-y-2 mb-6">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center">
                      <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="cta-button w-full justify-center">
                  Choose {plan.tier}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
