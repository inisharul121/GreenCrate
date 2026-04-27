"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/types";

const TABS = ["All","Pastries","Bowls","Drinks","Platters"];

export function CateringPageClient({ products }: { products: Product[] }) {
  const [tab, setTab] = useState("All");
  const filtered = tab === "All" ? products : products.filter(p => p.subcategory?.toLowerCase() === tab.toLowerCase());

  return (
    <>
      <section className="pt-28 pb-14 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            className="text-sage-light text-sm font-semibold uppercase tracking-widest mb-3">For every meeting</motion.p>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">Meeting Catering</motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
            className="text-white/60 text-lg max-w-xl mx-auto">
            Fresh pastries, power bowls, platters, and artisan drinks. Delivered before your meeting starts.
          </motion.p>
        </div>
      </section>

      {/* Info strip */}
      <div className="bg-sage/10 border-b border-sage/15 py-3 text-center">
        <p className="text-sm text-forest font-medium">⚡ Same-day delivery available · Min. 5 people · Vegetarian & vegan options</p>
      </div>

      {/* Category tabs */}
      <section className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-sage/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 flex-wrap">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                tab===t ? "bg-forest text-white" : "bg-cream text-charcoal/60 hover:bg-cream-dark"
              }`}>
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <motion.div key={p.id} layout initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
