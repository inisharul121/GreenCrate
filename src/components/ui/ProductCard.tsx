"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Leaf } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  isSubscription?: boolean;
  frequency?: "weekly" | "biweekly" | "monthly";
  className?: string;
}

const BADGE_STYLES: Record<string, string> = {
  "Bestseller":    "bg-amber/20 text-amber-800",
  "Team Favourite":"bg-amber/20 text-amber-800",
  "Seasonal":      "bg-sage/15 text-forest",
  "Local":         "bg-sage/15 text-forest",
  "Organic":       "bg-sage/15 text-forest",
  "Popular":       "bg-forest/10 text-forest",
  "Premium":       "bg-charcoal/10 text-charcoal",
  "Luxury":        "bg-charcoal/10 text-charcoal",
  "New":           "bg-blush text-rose-700",
  "Fresh Baked":   "bg-amber/15 text-amber-800",
  "Vegan":         "bg-sage/10 text-forest-dark",
  "Value":         "bg-blue-50 text-blue-700",
};

export function ProductCard({ product, isSubscription = false, frequency = "weekly", className }: ProductCardProps) {
  const { addItem } = useCartStore();
  const price = isSubscription ? product.subscriptionPrices[frequency] : product.price;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn("card group overflow-hidden flex flex-col", className)}
      aria-label={product.name}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-cream-dark">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges row */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.badges.slice(0, 2).map((badge) => (
            <span
              key={badge}
              className={cn("badge text-[11px]", BADGE_STYLES[badge] ?? "bg-cream text-charcoal/70")}
            >
              {badge}
            </span>
          ))}
        </div>
        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-charcoal/50 flex items-center justify-center">
            <span className="badge bg-white/90 text-charcoal font-semibold">Out of Season</span>
          </div>
        )}
        {product.seasonal && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 badge bg-white/90 text-forest text-[11px]">
              <Leaf className="w-2.5 h-2.5" /> Seasonal
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Dietary tags */}
        {product.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.dietaryTags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-pill capitalize">{tag}</span>
            ))}
          </div>
        )}

        <h3 className="font-display font-semibold text-charcoal text-lg leading-snug mb-1 group-hover:text-forest transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-charcoal/55 leading-relaxed flex-1 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-3">
          <Star className="w-3.5 h-3.5 fill-amber text-amber" />
          <span className="text-sm font-semibold text-charcoal">{product.rating}</span>
          <span className="text-xs text-charcoal/40">({product.reviewCount})</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-sage/10">
          <div>
            <p className="text-xl font-bold text-charcoal">{formatPrice(price)}</p>
            {isSubscription && (
              <p className="text-xs text-forest font-medium capitalize">{frequency}</p>
            )}
            {!isSubscription && product.subscriptionPrices.weekly < product.price && (
              <p className="text-xs text-forest/70">
                From {formatPrice(product.subscriptionPrices.weekly)}/wk subscribed
              </p>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => addItem(product, isSubscription, frequency)}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150",
              product.inStock
                ? "bg-forest text-white hover:bg-forest-light shadow-sm hover:shadow-md"
                : "bg-charcoal/10 text-charcoal/40 cursor-not-allowed"
            )}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
