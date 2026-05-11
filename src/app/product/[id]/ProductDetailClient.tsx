"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Calendar, 
  ShieldCheck, 
  Leaf, 
  Clock, 
  Minus, 
  Plus,
  Star,
  Check,
  Zap,
  Globe
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { OfferTiers } from "@/components/fruits/OfferTiers";
import type { Product, PurchaseType, SubscriptionFrequency } from "@/types";
import { cn } from "@/lib/utils";

export function ProductDetailClient({ product }: { product: Product }) {
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("subscription");
  const [frequency, setFrequency] = useState<SubscriptionFrequency>("weekly");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, purchaseType, frequency, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const getPrice = () => {
    if (purchaseType === "test") return 0;
    if (purchaseType === "subscription") return product.subscriptionPrices[frequency];
    return product.price;
  };

  return (
    <div className="bg-[#FDFCF9] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link 
          href="/fruits" 
          className="inline-flex items-center gap-2 text-charcoal/40 hover:text-forest font-bold text-sm mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Catalog
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Image & Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-premium border border-sage/10 bg-white relative">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                priority
                className="object-cover"
              />
            </div>
            
            {/* Badges */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              {product.badges.map(badge => (
                <span key={badge} className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-sage/10 text-forest text-[10px] font-bold uppercase tracking-widest">
                  {badge}
                </span>
              ))}
              {product.seasonal && (
                <span className="px-4 py-2 rounded-full bg-amber text-white text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  Seasonal
                </span>
              )}
            </div>

            {/* Micro-props */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: Leaf, label: "100% Organic", color: "bg-forest/5 text-forest" },
                { icon: Clock, label: "Before 8 AM", color: "bg-sage/10 text-forest-dark" },
                { icon: ShieldCheck, label: "Verified Farm", color: "bg-amber/10 text-amber-700" },
              ].map((prop, i) => (
                <div key={i} className={cn("p-4 rounded-3xl text-center flex flex-col items-center gap-2", prop.color)}>
                  <prop.icon className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">{prop.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Info & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-4 h-4 fill-amber text-amber", i >= Math.floor(product.rating) && "text-charcoal/10 fill-charcoal/10")} />
                  ))}
                </div>
                <span className="text-xs font-bold text-charcoal/30 uppercase tracking-widest">{product.reviewCount} Reviews</span>
              </div>
              
              <h1 className="font-display text-5xl sm:text-6xl font-bold text-charcoal mb-4 leading-tight">
                {product.name}
              </h1>
              
              <p className="text-xl text-charcoal/50 leading-relaxed max-w-xl">
                {product.description}
              </p>
            </div>

            <div className="space-y-10">
              {/* Purchase Types */}
              <div>
                <label className="text-sm font-bold text-charcoal/30 uppercase tracking-widest block mb-4">Select Purchase Plan</label>
                <OfferTiers selected={purchaseType} onSelect={setPurchaseType} />
              </div>

              {/* Frequency Selector */}
              <AnimatePresence>
                {purchaseType === "subscription" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="text-sm font-bold text-charcoal/30 uppercase tracking-widest block mb-4">Delivery Frequency</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["weekly", "biweekly", "monthly"] as SubscriptionFrequency[]).map(f => (
                        <button
                          key={f}
                          onClick={() => setFrequency(f)}
                          className={cn(
                            "py-3 rounded-2xl text-sm font-bold transition-all border",
                            frequency === f 
                              ? "bg-forest border-forest text-white shadow-lg" 
                              : "bg-white border-sage/10 text-charcoal/50 hover:border-forest/30"
                          )}
                        >
                          {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quantity & Price */}
              <div className="flex items-center justify-between p-8 rounded-[2.5rem] bg-white shadow-premium border border-sage/10">
                <div>
                  <label className="text-xs font-bold text-charcoal/30 uppercase tracking-widest block mb-1">Total Price</label>
                  <p className="text-3xl font-display font-bold text-forest">{formatPrice(getPrice() * quantity)}</p>
                  {purchaseType === "subscription" && (
                    <p className="text-xs font-bold text-forest/50 mt-1 uppercase tracking-widest italic">Save 15% with subscription</p>
                  )}
                </div>

                <div className="flex items-center gap-4 bg-forest/5 p-2 rounded-2xl">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-charcoal shadow-sm hover:text-forest transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-charcoal">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-charcoal shadow-sm hover:text-forest transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={cn(
                  "w-full py-6 rounded-full font-bold text-xl flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-2xl",
                  added 
                    ? "bg-emerald-500 text-white cursor-default" 
                    : "bg-forest text-white hover:bg-forest-light hover:-translate-y-1"
                )}
              >
                {added ? (
                  <>
                    <Check className="w-6 h-6" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" /> {purchaseType === "test" ? "Claim Your Free Box" : "Add to Cart"}
                  </>
                )}
              </button>

              {/* Trust Footer */}
              <div className="grid grid-cols-2 gap-4 border-t border-sage/10 pt-8">
                <div className="flex items-center gap-3 text-charcoal/50">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Local BD Farms</span>
                </div>
                <div className="flex items-center gap-3 text-charcoal/50">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Express Delivery</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
