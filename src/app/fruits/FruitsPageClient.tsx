"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SlidersHorizontal, Info } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { OfferTiers } from "@/components/fruits/OfferTiers";
import type { Product, SubscriptionFrequency, PurchaseType } from "@/types";

const FILTERS = ["All", "Seasonal", "Organic", "Bestseller", "Large Team"];

export function FruitsPageClient({ products }: { products: Product[] }) {
  const [activeFilter, setFilter]       = useState("All");
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("subscription");
  const [frequency, setFrequency]       = useState<SubscriptionFrequency>("weekly");

  const filtered = activeFilter === "All"
    ? products
    : products.filter(p =>
        p.badges.some(b => b.toLowerCase().includes(activeFilter.toLowerCase())) ||
        (activeFilter === "Seasonal" && p.seasonal)
      );

  return (
    <div className="bg-[#FDFCF9] min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-sage/5 -z-10 rounded-l-[5rem]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/5 border border-forest/10 text-forest text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
          >
            <Leaf className="w-3 h-3" /> Fresh from local BD farms
          </motion.div>
          
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            className="font-display text-6xl sm:text-7xl font-bold text-charcoal mb-6 leading-[1.1]">
            Premium Fruit <span className="text-forest italic font-serif">Boxes</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            className="text-charcoal/50 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Sourced from the best orchards in Rajshahi and beyond. Delivered fresh to your office before your team arrives.
          </motion.p>
        </div>

        {/* Offer Tiers */}
        <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{delay:0.4}}>
          <OfferTiers selected={purchaseType} onSelect={setPurchaseType} />
        </motion.div>
      </section>

      {/* Info Banner */}
      <AnimatePresence>
        {purchaseType === "test" && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-forest/5 border-y border-forest/10 py-3"
          >
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 text-forest font-semibold text-sm">
              <Info className="w-4 h-4" />
              Limit 1 free test box per company. Valid for new customers only.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters & Product Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 border-b border-sage/10 pb-8">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              <Filter className="w-4 h-4 text-charcoal/30 shrink-0" />
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                    activeFilter===f ? "bg-charcoal text-white shadow-md" : "bg-white text-charcoal/40 hover:text-charcoal border border-sage/10"
                  }`}>
                  {f}
                </button>
              ))}
            </div>

            {purchaseType === "subscription" && (
              <div className="flex items-center gap-3 bg-white p-1.5 rounded-full border border-sage/10 shadow-sm">
                <SlidersHorizontal className="w-4 h-4 text-charcoal/30 ml-3" />
                <select value={frequency} onChange={e => setFrequency(e.target.value as SubscriptionFrequency)}
                  className="text-sm font-bold text-charcoal bg-transparent focus:outline-none pr-4">
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-8">
            <p className="text-sm font-bold text-charcoal/30 uppercase tracking-widest">{filtered.length} varieties found</p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-sage/10">
              <p className="text-charcoal/30 font-medium text-lg">No boxes match your selection.</p>
            </div>
          ) : (
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(p => (
                <motion.div key={p.id} layout initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}}>
                  <ProductCard 
                    product={p} 
                    purchaseType={purchaseType} 
                    frequency={frequency} 
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      {/* How it Works */}
      <section className="py-24 bg-white border-t border-sage/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-charcoal">How it <span className="text-forest italic">works</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Pick your box", desc: "Choose from our curated seasonal fruit boxes or create a custom plan." },
              { step: "02", title: "Set schedule", desc: "Select a one-time order or save 15% with a flexible weekly subscription." },
              { step: "03", title: "Morning delivery", desc: "Our team delivers fresh to your office before 8 AM. Enjoy the energy!" },
            ].map((s, i) => (
              <div key={i} className="relative p-8 rounded-[2.5rem] bg-cream border border-sage/5 group hover:bg-forest/5 transition-colors">
                <span className="absolute -top-6 left-8 text-6xl font-display font-black text-forest/5 group-hover:text-forest/10 transition-colors">{s.step}</span>
                <h3 className="font-display font-bold text-xl text-charcoal mb-3 relative z-10">{s.title}</h3>
                <p className="text-charcoal/50 text-sm leading-relaxed relative z-10">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
