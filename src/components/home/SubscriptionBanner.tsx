"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { SubscriptionFrequency } from "@/types";

const FREQUENCIES: { value: SubscriptionFrequency; label: string; discount: number }[] = [
  { value: "weekly",   label: "Weekly",    discount: 15 },
  { value: "biweekly", label: "Bi-weekly", discount: 10 },
  { value: "monthly",  label: "Monthly",   discount: 6  },
];

const PERKS = [
  "Cancel or pause anytime",
  "Free delivery on every order",
  "Priority freshness guarantee",
  "Seasonal surprise extras",
];

export function SubscriptionBanner() {
  const [freq, setFreq] = useState<SubscriptionFrequency>("weekly");
  const basePrice = 34.9;
  const selected  = FREQUENCIES.find(f => f.value === freq)!;
  const price     = basePrice * (1 - selected.discount / 100);

  return (
    <section className="py-24 bg-cream" aria-label="Subscription plans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-hero-gradient rounded-4xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left copy */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <span className="inline-block mb-4 text-xs font-bold uppercase tracking-widest text-sage-light">Subscribe &amp; Save</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Never run out of fresh fruit again
              </h2>
              <p className="text-white/60 leading-relaxed mb-8 max-w-md">
                Set up a recurring delivery and save up to 15% on every order. Pause, skip, or cancel with one click — no commitment.
              </p>
              <ul className="space-y-3 mb-8">
                {PERKS.map(p => (
                  <li key={p} className="flex items-center gap-2.5 text-white/80 text-sm">
                    <span className="w-5 h-5 rounded-full bg-sage/25 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-sage-light" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link href="/fruits" className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-full bg-white text-forest font-bold text-sm hover:bg-cream transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200">
                Start Subscribing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right price card */}
            <div className="p-10 lg:p-14 flex items-center justify-center bg-white/5 backdrop-blur-sm border-l border-white/10">
              <div className="w-full max-w-sm">
                <p className="text-white/60 text-sm font-medium mb-4">Select your delivery frequency</p>

                {/* Frequency buttons */}
                <div className="flex flex-col gap-3 mb-8">
                  {FREQUENCIES.map(f => (
                    <button
                      key={f.value}
                      onClick={() => setFreq(f.value)}
                      className={`flex items-center justify-between px-5 py-3.5 rounded-2xl border-2 transition-all duration-150 ${
                        freq === f.value
                          ? "border-white bg-white/15 text-white"
                          : "border-white/20 text-white/60 hover:border-white/40"
                      }`}
                    >
                      <span className="font-semibold">{f.label}</span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${freq===f.value ? "bg-sage/30 text-sage-light" : "bg-white/10 text-white/50"}`}>
                        Save {f.discount}%
                      </span>
                    </button>
                  ))}
                </div>

                {/* Price display */}
                <motion.div key={freq} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                  className="rounded-2xl bg-white/10 border border-white/15 p-5">
                  <p className="text-white/50 text-xs mb-1">Classic Fruit Box · {selected.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-white">{formatPrice(price)}</span>
                    <span className="text-white/40 text-sm line-through">{formatPrice(basePrice)}</span>
                  </div>
                  <p className="text-sage-light text-xs font-semibold mt-1">You save {formatPrice(basePrice - price)} per delivery</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
