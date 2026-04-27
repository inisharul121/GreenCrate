"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product, SubscriptionFrequency } from "@/types";

interface Props { fruits: Product[]; catering: Product[]; }
type Tab = "fruits" | "catering";

export function FeaturedProducts({ fruits, catering }: Props) {
  const [tab, setTab]                   = useState<Tab>("fruits");
  const [isSubscription, setIsSub]      = useState(false);
  const [frequency, setFrequency]       = useState<SubscriptionFrequency>("weekly");
  const products = tab === "fruits" ? fruits : catering;

  return (
    <section className="py-24 bg-white" aria-label="Featured products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold text-sage uppercase tracking-widest mb-2">Hand-picked for you</p>
            <h2 className="font-display text-4xl font-bold text-charcoal">Staff favourites</h2>
          </div>
          <Link href={tab === "fruits" ? "/fruits" : "/catering"} className="flex items-center gap-1.5 text-sm font-semibold text-forest hover:text-forest-light transition-colors group">
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-1 p-1 bg-cream rounded-2xl self-start">
            {(["fruits","catering"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)} aria-pressed={tab===t}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${tab===t ? "bg-forest text-white shadow-sm" : "text-charcoal/60 hover:text-charcoal"}`}>
                {t === "fruits" ? "🍎 Fruit Boxes" : "🥗 Catering"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-charcoal/50">Subscription prices</span>
            <button onClick={() => setIsSub(v => !v)} role="switch" aria-checked={isSubscription}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${isSubscription ? "bg-forest" : "bg-charcoal/15"}`}>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${isSubscription ? "left-5" : "left-0.5"}`} />
            </button>
            {isSubscription && (
              <select value={frequency} onChange={e => setFrequency(e.target.value as SubscriptionFrequency)}
                className="text-sm border border-sage/20 rounded-xl px-3 py-1.5 text-charcoal bg-white focus:outline-none focus:border-forest/40">
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            )}
          </div>
        </div>

        <motion.div key={tab} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} isSubscription={isSubscription} frequency={frequency} />)}
        </motion.div>
      </div>
    </section>
  );
}
