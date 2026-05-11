"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Star, Leaf } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, cn } from "@/lib/utils";
import type { Product, PurchaseType, SubscriptionFrequency } from "@/types";

interface ProductCardProps {
  product: Product;
  purchaseType?: PurchaseType;
  frequency?: SubscriptionFrequency;
  className?: string;
}

const BADGE_STYLES: Record<string, string> = {
  "Bestseller":    "bg-amber-50 text-amber-600 border-amber-100",
  "Team Favourite":"bg-amber-50 text-amber-600 border-amber-100",
  "Seasonal":      "bg-sage/10 text-forest border-sage/20",
  "Local":         "bg-sage/10 text-forest border-sage/20",
  "Organic":       "bg-sage/10 text-forest border-sage/20",
  "Fresh Baked":   "bg-amber-50 text-amber-700 border-amber-100",
  "Vegan":         "bg-sage/5 text-forest border-sage/10",
};

export function ProductCard({ product, purchaseType = "onetime", frequency = "weekly", className }: ProductCardProps) {
  const { addItem } = useCartStore();
  
  const getPrice = () => {
    if (purchaseType === "test") return 0;
    if (purchaseType === "subscription") return product.subscriptionPrices[frequency];
    return product.price;
  };

  const price = getPrice();

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("bg-white rounded-[2.5rem] overflow-hidden flex flex-col group shadow-sm hover:shadow-2xl transition-all duration-500 border border-sage/10", className)}
      aria-label={product.name}
    >
      {/* Image Container */}
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-cream/30 cursor-pointer">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", BADGE_STYLES[badge] ?? "bg-white/90 text-charcoal/60 border-white")}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Purchase Type Badge */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm border border-white flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
              <span className="text-[10px] font-bold text-charcoal uppercase tracking-widest">
                {purchaseType === "test" ? "Trial" : purchaseType}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-8">
        <div className="mb-4">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-display font-bold text-charcoal text-2xl leading-tight mb-2 group-hover:text-forest transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-charcoal/40 leading-relaxed line-clamp-2">{product.description}</p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-sage/5 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-charcoal">
                {price === 0 ? "Free" : formatPrice(price)}
              </span>
              {purchaseType === "subscription" && (
                <span className="text-xs font-bold text-charcoal/30 uppercase">/{frequency}</span>
              )}
            </div>
            {purchaseType === "onetime" && (
              <p className="text-[10px] font-bold text-forest uppercase mt-1">
                Save 15% with subscription
              </p>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addItem(product, purchaseType, frequency)}
            disabled={!product.inStock}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
              product.inStock
                ? "bg-forest text-white hover:bg-forest-light shadow-lg hover:shadow-forest/20"
                : "bg-charcoal/5 text-charcoal/20 cursor-not-allowed"
            )}
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
