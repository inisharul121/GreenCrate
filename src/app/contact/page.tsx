"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

const OFFICES = [
  { city: "Dhaka (HQ)", address: "House 12, Road 5, Gulshan 1, Dhaka 1212", phone: "+880 2 000 00 00", hours: "Sat–Thu 9:00–19:00" },
  { city: "Chattogram", address: "Agrabad C/A, Chattogram", phone: "+880 31 000 00 00", hours: "Sat–Thu 9:00–18:00" },
];

const FAQS = [
  { q: "Where do you deliver?", a: "We currently deliver to all major business districts in Dhaka and Chattogram." },
  { q: "What is the minimum order?", a: "For catering, the minimum order is for 5 people. Fruit boxes have no minimum." },
  { q: "Can I change my subscription?", a: "Yes! You can pause, skip, or modify your subscription anytime from your dashboard." },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Send message instantly
    setLoading(false);
    setSent(true);
  };

  return (
    <>
      <section className="pt-28 pb-14 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sage-light text-sm font-semibold uppercase tracking-widest mb-3">Get in touch</p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">Contact us</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">Questions about delivery, custom orders, or corporate accounts? We&apos;d love to hear from you.</p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-4xl p-8 shadow-card">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6">Send a message</h2>

              {sent ? (
                <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
                  className="flex flex-col items-center text-center py-10">
                  <CheckCircle2 className="w-16 h-16 text-sage mb-4" />
                  <h3 className="font-display text-xl font-bold text-charcoal mb-2">Message sent!</h3>
                  <p className="text-charcoal/55">We&apos;ll get back to you within 1 business day.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-semibold text-charcoal mb-1.5">First name</label>
                      <input id="first-name" type="text" required placeholder="Nina"
                        className="w-full px-4 py-3 rounded-2xl border-2 border-sage/15 bg-cream text-charcoal text-sm focus:outline-none focus:border-forest/50 transition" />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-semibold text-charcoal mb-1.5">Last name</label>
                      <input id="last-name" type="text" required placeholder="Chowdhury"
                        className="w-full px-4 py-3 rounded-2xl border-2 border-sage/15 bg-cream text-charcoal text-sm focus:outline-none focus:border-forest/50 transition" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-1.5">Work email</label>
                    <input id="email" type="email" required placeholder="nina@company.com.bd"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-sage/15 bg-cream text-charcoal text-sm focus:outline-none focus:border-forest/50 transition" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-charcoal mb-1.5">Company</label>
                    <input id="company" type="text" placeholder="Grameenphone Ltd"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-sage/15 bg-cream text-charcoal text-sm focus:outline-none focus:border-forest/50 transition" />
                  </div>
                  <div>
                    <label htmlFor="topic" className="block text-sm font-semibold text-charcoal mb-1.5">Topic</label>
                    <select id="topic"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-sage/15 bg-cream text-charcoal text-sm focus:outline-none focus:border-forest/50 transition">
                      <option>Fruit Box subscription</option>
                      <option>Meeting catering</option>
                      <option>Corporate gifts</option>
                      <option>Custom / enterprise</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-1.5">Message</label>
                    <textarea id="message" rows={4} required placeholder="Tell us what you need..."
                      className="w-full px-4 py-3 rounded-2xl border-2 border-sage/15 bg-cream text-charcoal text-sm focus:outline-none focus:border-forest/50 transition resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="btn-primary w-full justify-center py-3.5 text-base">
                    {loading ? "Sending…" : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact info — 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-card">
              <h3 className="font-display font-semibold text-charcoal text-lg mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-forest" /> Direct contact
              </h3>
              <ul className="space-y-3 text-sm text-charcoal/65">
                <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-sage shrink-0" />hello@greencrate.com.bd</li>
                <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-sage shrink-0" />+880 2 000 00 00</li>
              </ul>
            </div>

            {OFFICES.map(o => (
              <div key={o.city} className="bg-white rounded-3xl p-6 shadow-card">
                <h3 className="font-display font-semibold text-charcoal text-base mb-3">{o.city}</h3>
                <ul className="space-y-2.5 text-sm text-charcoal/65">
                  <li className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />{o.address}</li>
                  <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-sage shrink-0" />{o.phone}</li>
                  <li className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-sage shrink-0" />{o.hours}</li>
                </ul>
              </div>
            ))}

            <div className="rounded-3xl bg-forest/6 border-2 border-forest/15 p-5">
              <p className="text-sm font-semibold text-forest mb-1">Enterprise & bulk orders</p>
              <p className="text-xs text-charcoal/55">For 50+ employees or custom requirements, email us at <span className="text-forest font-medium">enterprise@greencrate.com.bd</span></p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 bg-white border-t border-sage/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-charcoal">Frequently Asked <span className="text-forest italic">Questions</span></h2>
          </div>
          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-cream border border-sage/5 hover:bg-cream-dark transition-colors"
              >
                <h3 className="font-display font-bold text-lg text-charcoal mb-3">{faq.q}</h3>
                <p className="text-charcoal/50 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
