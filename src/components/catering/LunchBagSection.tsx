"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/types";
import { ShoppingBag, Star } from "lucide-react";

interface Props {
  products: Product[];
}

export function LunchBagSection({ products }: Props) {
  const lunchBags = products.filter(p => p.subcategory === "lunchbags");

  if (lunchBags.length === 0) return null;

  return (
    <section className="py-24 bg-sage/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sage/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-bold uppercase tracking-widest mb-4">
              <ShoppingBag className="w-3.5 h-3.5" />
              New Concept
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-charcoal mb-6">
              Individual <span className="text-forest italic font-serif">Lunchbags</span>
            </h2>
            <p className="text-lg text-charcoal/50 leading-relaxed">
              No time for a long lunch? Our pre-packed lunchbags are perfect for desk-side dining or quick team meetings. Healthy, balanced, and delicious.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-sage/10">
            <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center">
              <Star className="w-6 h-6 text-amber fill-amber" />
            </div>
            <div>
              <p className="text-charcoal font-bold text-lg">Rated 4.9/5</p>
              <p className="text-charcoal/40 text-sm font-medium">By 200+ desk-warriors</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {lunchBags.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProductCard product={p} purchaseType="onetime" />
            </motion.div>
          ))}
          
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-forest rounded-[2.5rem] p-10 flex flex-col justify-center text-white relative overflow-hidden group shadow-xl"
          >
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
            
            <h3 className="font-display text-3xl font-bold mb-6 relative z-10">
              Bulk Order for your Team?
            </h3>
            <p className="text-white/70 mb-8 relative z-10 leading-relaxed">
              Ordering for more than 20 people? We offer custom branding and volume discounts.
            </p>
            
            <button className="w-full py-4 rounded-full bg-white text-forest font-bold text-sm hover:bg-cream transition-all relative z-10">
              Contact Sales
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
