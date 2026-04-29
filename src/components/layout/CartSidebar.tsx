"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, Trash2, Leaf } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartSidebar() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, subtotal } = useCartStore();
  const total = subtotal();

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
            aria-label="Shopping cart"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-sage/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-forest" />
                <h2 className="font-display font-bold text-lg text-charcoal">Your Cart</h2>
                {items.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-forest/10 text-forest text-xs font-semibold">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream-dark text-charcoal/50 hover:text-charcoal transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center px-8">
                  <div className="w-20 h-20 rounded-full bg-sage/10 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-9 h-9 text-sage" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-charcoal mb-1">Your cart is empty</h3>
                  <p className="text-sm text-charcoal/50 mb-6">Add some fresh goodness for your team!</p>
                  <button onClick={closeCart} className="btn-primary">
                    Browse Products
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-sage/8 px-4 py-2">
                    {items.map((item) => {
                      const isTest = item.purchaseType === "test";
                      const price = isTest ? 0 : (
                        item.purchaseType === "subscription" && item.frequency
                          ? item.product.subscriptionPrices[item.frequency]
                          : item.product.price
                      );
                      
                      return (
                        <li key={`${item.product.id}-${item.purchaseType}`} className="flex gap-4 py-6">
                          {/* Image */}
                          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-cream-dark shrink-0 relative border border-sage/10">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                            {isTest && (
                              <div className="absolute inset-0 bg-forest/20 flex items-center justify-center">
                                <span className="text-[10px] font-black text-white uppercase tracking-tighter bg-forest px-2 py-0.5 rounded-full">Free</span>
                              </div>
                            )}
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <p className="text-sm font-bold text-charcoal truncate pr-2">{item.product.name}</p>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="text-charcoal/20 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className={cn(
                                "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md",
                                isTest ? "bg-forest text-white" : "bg-sage/10 text-forest"
                              )}>
                                {isTest ? "Free Trial" : item.purchaseType}
                              </span>
                              {item.purchaseType === "subscription" && (
                                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-amber/10 text-amber-700">
                                  {item.frequency}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 bg-cream/50 rounded-full px-2 py-1 border border-sage/5">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white transition-all text-charcoal/40"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-bold text-charcoal w-4 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white transition-all text-charcoal/40"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <p className="text-sm font-bold text-charcoal">
                                {isTest ? "Free" : formatPrice(price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-sage/10 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-charcoal/60">Subtotal</span>
                  <span className="font-bold text-charcoal text-lg">{formatPrice(total)}</span>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-forest/70">
                  <Leaf className="w-3 h-3" /> Free delivery on orders over BDT 5000
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full justify-center text-base py-3.5"
                >
                  Proceed to Checkout
                </Link>
                <button onClick={closeCart} className="w-full text-sm text-charcoal/50 hover:text-charcoal text-center transition-colors">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
