"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { SubscriptionToggle } from "@/components/ui/SubscriptionToggle";
import type { Product, SubscriptionFrequency } from "@/types";

const FILTERS = ["All", "Seasonal", "Organic", "Bestseller", "Large Team"];

export function FruitsPageClient({ products }: { products: Product[] }) {
  const [activeFilter, setFilter]       = useState("All");
  const [isSubscription, setIsSub]      = useState(false);
  const [frequency, setFrequency]       = useState<SubscriptionFrequency>("weekly");

  const filtered = activeFilter === "All"
    ? products
    : products.filter(p =>
        p.badges.some(b => b.toLowerCase().includes(activeFilter.toLowerCase())) ||
        (activeFilter === "Seasonal" && p.seasonal)
      );

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-14 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            className="text-sage-light text-sm font-semibold uppercase tracking-widest mb-3">Fresh from the farm</motion.p>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
            Fruit Boxes
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
            className="text-white/60 text-lg max-w-xl mx-auto">
            Handpicked seasonal fruits delivered to your office — subscribe and save up to 15%.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-sage/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-charcoal/40" />
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeFilter===f ? "bg-forest text-white" : "bg-cream text-charcoal/60 hover:bg-cream-dark"
                }`}>
                {f}
              </button>
            ))}
          </div>
          {/* Subscription toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-charcoal/40" />
            <SubscriptionToggle
              value={frequency}
              onChange={setFrequency}
              isSubscription={isSubscription}
              onSubscriptionChange={setIsSub}
              showOneTime
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-charcoal/50 mb-6">{filtered.length} products</p>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-charcoal/40">No products match this filter.</div>
          ) : (
            <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => (
                <motion.div key={p.id} layout initial={{opacity:0,scale:0.96}} animate={{opacity:1,scale:1}}>
                  <ProductCard product={p} isSubscription={isSubscription} frequency={frequency} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
