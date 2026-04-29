"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/products";

const LOGOS = ["Grameenphone", "Pathao", "BRAC", "Bkash", "BSRM"];

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx(i => (i + 1) % testimonials.length);
  const t    = testimonials[idx];

  return (
    <section className="py-24 bg-white" aria-label="Customer testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-sage uppercase tracking-widest mb-2">Loved by teams</p>
          <h2 className="font-display text-4xl font-bold text-charcoal">What our clients say</h2>
        </div>

        {/* Company logos */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-16 opacity-40">
          {LOGOS.map(name => (
            <span key={name} className="text-sm font-bold text-charcoal uppercase tracking-wider">{name}</span>
          ))}
        </div>

        {/* Testimonial card */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity:0, x:30 }}
              animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x:-30 }}
              transition={{ duration:0.35 }}
              className="bg-cream rounded-4xl p-10 lg:p-14 text-center"
            >
              <Quote className="w-10 h-10 text-sage/40 mx-auto mb-6" />
              <p className="font-display text-xl lg:text-2xl text-charcoal leading-relaxed mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold text-lg mb-2">
                  {t.author.split(" ").map(n => n[0]).join("")}
                </div>
                <p className="font-semibold text-charcoal">{t.author}</p>
                <p className="text-sm text-charcoal/50">{t.role} · {t.company}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <button onClick={prev} aria-label="Previous testimonial"
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-card hover:shadow-card-hover flex items-center justify-center text-charcoal/60 hover:text-forest transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} aria-label="Next testimonial"
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-card hover:shadow-card-hover flex items-center justify-center text-charcoal/60 hover:text-forest transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Testimonial ${i+1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i===idx ? "w-6 bg-forest" : "w-1.5 bg-charcoal/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
