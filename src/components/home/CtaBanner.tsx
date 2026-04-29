"use client";

import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-20 bg-white" aria-label="Get started CTA">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-sage-gradient p-12 lg:p-16 text-center shadow-premium">
          {/* Blobs */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-forest/20 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="w-5 h-5 text-white/80" />
              <span className="text-white/80 text-sm font-semibold uppercase tracking-widest">Start today</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Ready to nourish your team?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Join 500+ Bangladeshi companies delivering freshness every morning. First box on us — no commitment.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/test-order"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-forest font-bold hover:bg-cream transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 duration-200">
                Get Your First Box <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/40 text-white font-semibold hover:bg-white/15 transition-all duration-200">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
