"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Gift, Package, Tag, Truck, Leaf } from "lucide-react";
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
      <section className="pt-32 pb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-amber/5 -z-10 rounded-l-[5rem]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber/10 border border-amber/20 text-amber-700 text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
          >
            <Gift className="w-3 h-3" /> Premium Corporate Gifting
          </motion.div>

          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            className="font-display text-6xl sm:text-7xl font-bold text-charcoal mb-6 leading-[1.1]">
            Make an <span className="text-forest italic font-serif">Impression</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            className="text-charcoal/50 text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Branded gift boxes that your clients and team will actually love. Local artisan treats, beautifully packaged.
          </motion.p>
        </div>
      </section>

      {/* How it works steps */}
      <section className="py-16 bg-white border-y border-sage/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-4 gap-6">
            {STEPS.map(({ icon: Icon, label, desc }, i) => (
              <motion.div 
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center p-8 rounded-[2.5rem] bg-cream border border-sage/5 hover:bg-white hover:shadow-premium transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-forest group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-charcoal mb-2">{label}</h3>
                <p className="text-xs text-charcoal/40 font-medium leading-relaxed text-center">{desc}</p>
              </motion.div>
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {DISCOUNTS.map(({ qty, pct }) => (
              <div key={qty} className="group p-8 rounded-[2.5rem] bg-forest/5 border border-forest/10 hover:bg-forest hover:text-white transition-all duration-500">
                <p className="text-4xl font-display font-black mb-2">{pct}%</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Off · {qty} boxes</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-charcoal/40 mt-6">Discounts applied automatically at checkout. Contact us for orders of 100+ boxes.</p>
        </div>
      </section>
    </>
  );
}
