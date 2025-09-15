'use client';
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        setState('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setState('error');
        setErrorMessage(result.error || 'Something went wrong');
      }
    } catch (error) {
      setState('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (state === 'success') {
    return (
      <div className="max-w-xl mt-6 p-6 rounded-2xl border border-green-200 bg-green-50">
        <h3 className="text-lg font-semibold text-green-900">Message sent!</h3>
        <p className="text-green-700 mt-1">Thanks for reaching out. German will get back to you soon.</p>
        <button 
          onClick={() => setState('idle')}
          className="mt-4 text-sm text-green-700 underline hover:no-underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl mt-6">
      <input 
        required 
        name="name" 
        value={formData.name}
        onChange={handleChange}
        placeholder="Your name" 
        className="rounded-xl border border-slate-300 px-4 py-3 focus:border-slate-500 focus:outline-none" 
      />
      <input 
        required 
        type="email" 
        name="email" 
        value={formData.email}
        onChange={handleChange}
        placeholder="Email" 
        className="rounded-xl border border-slate-300 px-4 py-3 focus:border-slate-500 focus:outline-none" 
      />
      <input 
        name="phone" 
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone (optional)" 
        className="rounded-xl border border-slate-300 px-4 py-3 focus:border-slate-500 focus:outline-none" 
      />
      <textarea 
        required 
        name="message" 
        value={formData.message}
        onChange={handleChange}
        placeholder="What do you need help with? (AI automation, calendar management, tech setup, home repairs, etc.)" 
        className="rounded-xl border border-slate-300 px-4 py-3 min-h-[140px] focus:border-slate-500 focus:outline-none resize-y" 
      />
      
      {state === 'error' && (
        <div className="p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
          {errorMessage}
        </div>
      )}
      
      <button 
        type="submit"
        disabled={state === 'loading'}
        className="rounded-2xl bg-black text-white px-5 py-3 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {state === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
