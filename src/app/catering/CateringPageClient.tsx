"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import { LunchBagSection } from "@/components/catering/LunchBagSection";
import { Leaf, Zap, Users } from "lucide-react";
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
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/5 border border-forest/10 text-forest text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
          >
            <Leaf className="w-3 h-3" /> Professional Office Catering
          </motion.div>

          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            className="font-display text-6xl sm:text-7xl font-bold text-charcoal mb-6 leading-[1.1]">
            Meeting <span className="text-forest italic font-serif">Catering</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            className="text-charcoal/50 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Fresh pastries, power bowls, and artisan platters. Sourced locally and delivered with care to your office.
          </motion.p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-sage/10 text-[10px] font-bold uppercase tracking-widest text-charcoal/60">
              <Zap className="w-3 h-3 text-amber" /> Same-day delivery
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-sage/10 text-[10px] font-bold uppercase tracking-widest text-charcoal/60">
              <Leaf className="w-3 h-3 text-forest" /> Vegan options
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-sage/10 text-[10px] font-bold uppercase tracking-widest text-charcoal/60">
              <Users className="w-3 h-3 text-charcoal/40" /> Min. 5 people
            </div>
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
                className={`relative px-8 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  tab===t ? "text-white" : "text-charcoal/40 hover:text-charcoal"
                }`}>
                {tab === t && (
                  <motion.div 
                    layoutId="active-tab"
                    className="absolute inset-0 bg-charcoal rounded-full shadow-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t}</span>
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
