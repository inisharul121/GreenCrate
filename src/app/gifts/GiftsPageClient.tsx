"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Gift, Package, Tag, Truck } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const STEPS = [
  { icon: Package, label: "Choose Box",   desc: "Pick your box size" },
  { icon: Gift,    label: "Customise",    desc: "Select items & extras" },
  { icon: Tag,     label: "Add Branding", desc: "Upload logo & message" },
  { icon: Truck,   label: "Delivery",     desc: "Set date & address" },
];

const DISCOUNTS = [
  { qty: "5–9",   pct: 5 },
  { qty: "10–24", pct: 10 },
  { qty: "25–49", pct: 15 },
  { qty: "50+",   pct: 20 },
];

export function GiftsPageClient({ products }: { products: Product[] }) {
  const [step, setStep] = useState(0);

  return (
    <>
      <section className="pt-28 pb-14 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="text-sage-light text-sm font-semibold uppercase tracking-widest mb-3">Make an impression</motion.p>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">Corporate Gifts</motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-white/60 text-lg max-w-xl mx-auto">
            Branded gift boxes that your clients and team will actually love. Premium ingredients, beautiful packaging.
          </motion.p>
        </div>
      </section>

      {/* How it works steps */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-charcoal text-center mb-10">How it works</h2>
          <div className="grid sm:grid-cols-4 gap-4">
            {STEPS.map(({ icon: Icon, label, desc }, i) => (
              <button key={label} onClick={() => setStep(i)}
                className={`flex flex-col items-center p-6 rounded-3xl border-2 text-center transition-all duration-200 ${
                  step===i ? "border-forest bg-forest/6" : "border-sage/15 hover:border-sage/40"
                }`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${step===i ? "bg-forest text-white" : "bg-cream text-forest"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${step===i ? "text-forest" : "text-charcoal/40"}`}>Step {i+1}</span>
                <p className="font-semibold text-charcoal text-sm">{label}</p>
                <p className="text-xs text-charcoal/50 mt-1">{desc}</p>
                {step===i && <Check className="w-4 h-4 text-forest mt-2" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-charcoal mb-8">Choose your gift box</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Bulk discounts */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-charcoal mb-2">Bulk order discounts</h2>
          <p className="text-charcoal/55 mb-8">The more you order, the more you save. Perfect for year-end gifting.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {DISCOUNTS.map(({ qty, pct }) => (
              <div key={qty} className="rounded-2xl border-2 border-sage/20 p-5 text-center">
                <p className="text-2xl font-bold text-forest mb-1">{pct}%</p>
                <p className="text-sm text-charcoal/60">off · {qty} boxes</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-charcoal/40 mt-6">Discounts applied automatically at checkout. Contact us for orders of 100+ boxes.</p>
        </div>
      </section>
    </>
  );
}
