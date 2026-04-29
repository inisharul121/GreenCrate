"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import { LunchBagSection } from "@/components/catering/LunchBagSection";
import type { Product } from "@/types";

const TABS = ["All","Pastries","Bowls","Drinks","Platters"];

export function CateringPageClient({ products }: { products: Product[] }) {
  const [tab, setTab] = useState("All");
  
  // Filter out lunchbags from the main grid to show them in their own section
  const mainProducts = products.filter(p => p.subcategory !== "lunchbags");
  const filtered = tab === "All" ? mainProducts : mainProducts.filter(p => p.subcategory?.toLowerCase() === tab.toLowerCase());

  return (
    <div className="bg-[#FDFCF9] min-h-screen">
      <section className="pt-32 pb-20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[40%] h-full bg-sage/5 -z-10 rounded-r-[5rem]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            className="text-forest text-xs font-bold uppercase tracking-[0.2em] mb-4">For every meeting</motion.p>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            className="font-display text-6xl sm:text-7xl font-bold text-charcoal mb-6 leading-tight">
            Meeting <span className="text-forest italic font-serif">Catering</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
            className="text-charcoal/50 text-xl max-w-2xl mx-auto mb-4">
            Fresh pastries, power bowls, and artisan platters. Delivered with care to your office door.
          </motion.p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <p className="text-xs font-bold text-forest uppercase tracking-widest bg-forest/5 px-4 py-2 rounded-full border border-forest/10">⚡ Same-day delivery</p>
            <p className="text-xs font-bold text-forest uppercase tracking-widest bg-forest/5 px-4 py-2 rounded-full border border-forest/10">🥗 Vegan & Vegan options</p>
            <p className="text-xs font-bold text-forest uppercase tracking-widest bg-forest/5 px-4 py-2 rounded-full border border-forest/10">📦 Min. 5 people</p>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-12 scrollbar-hide border-b border-sage/10">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  tab===t ? "bg-charcoal text-white shadow-lg" : "bg-white text-charcoal/40 hover:text-charcoal border border-sage/10"
                }`}>
                {t}
              </button>
            ))}
          </div>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(p => (
              <motion.div key={p.id} layout initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LunchBag Section */}
      <LunchBagSection products={products} />
    </div>
  );
}
