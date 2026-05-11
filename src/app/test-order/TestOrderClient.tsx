"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Check, ShieldCheck, Zap, Globe } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { fruits } from "@/lib/products";
import Link from "next/link";

export function TestOrderClient() {
  const { addItem } = useCartStore();
  const sampleProduct = fruits[0]; // Classic Fruit Box

  return (
    <div className="bg-[#FDFCF9] min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/5 border border-forest/10 text-forest text-xs font-bold uppercase tracking-widest mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Limited time offer
            </div>
            
            <h1 className="font-display text-6xl sm:text-7xl font-bold text-charcoal leading-tight mb-8">
              Taste the <span className="text-forest italic font-serif">difference</span>.
            </h1>
            
            <p className="text-xl text-charcoal/50 leading-relaxed mb-10">
              Not sure if GreenCrate is right for your team? Try our most popular fruit box for free. No strings attached, just fresh seasonal goodness delivered to your office.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              <Feature icon={ShieldCheck} title="No Commitment" desc="Cancel or switch to a plan anytime." />
              <Feature icon={Zap} title="Express Delivery" desc="Arrives before 8 AM tomorrow." />
              <Feature icon={Check} title="Full Size" desc="You get the actual 12-piece box." />
              <Feature icon={Globe} title="Local Farms" desc="Sourced from local Bangladeshi producers." />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addItem(sampleProduct, "test")}
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-forest text-white font-bold text-lg hover:bg-forest-light transition-all shadow-xl hover:shadow-forest/20"
            >
              Claim Your Free Box <ArrowRight className="w-6 h-6" />
            </motion.button>
            
            <p className="mt-6 text-sm text-charcoal/30 font-medium italic">
              * Valid for companies with 5+ employees in our delivery zones.
            </p>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-sage/5 rounded-[5rem] rotate-6 scale-105" />
            <div className="relative aspect-[4/5] bg-white rounded-[5rem] overflow-hidden shadow-2xl border border-sage/10">
              <Image
                src={sampleProduct.image}
                alt="Classic Fruit Box"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <p className="text-sm font-bold uppercase tracking-widest mb-2 text-sage-light">Included in Trial</p>
                <h3 className="text-3xl font-bold font-display">{sampleProduct.name}</h3>
                <p className="text-white/70 mt-2">12-15 pieces of seasonal handpicked fruit.</p>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber rounded-full flex flex-col items-center justify-center shadow-xl rotate-12">
              <span className="text-white font-black text-2xl uppercase tracking-tighter">Free</span>
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">BDT 0.00</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-forest" />
      </div>
      <div>
        <h4 className="font-bold text-charcoal">{title}</h4>
        <p className="text-sm text-charcoal/40">{desc}</p>
      </div>
    </div>
  );
}
