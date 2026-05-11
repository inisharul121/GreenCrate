"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Building,
  Smartphone
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formatPrice, cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export function CheckoutClient() {
  const { items, subtotal, clearCart } = useCartStore();
  const total = subtotal();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleCompleteOrder = async () => {
    setIsProcessing(true);
    try {
      const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const orderData = {
        id: orderId,
        totalAmount: subtotal(),
        items: items.map(item => ({
          product: { id: item.product.id },
          quantity: item.quantity,
          purchaseType: item.purchaseType,
          frequency: item.frequency,
          price: (item.purchaseType === "test" ? 0 : (
            item.purchaseType === "subscription" && item.frequency
              ? item.product.subscriptionPrices[item.frequency]
              : item.product.price
          ))
        }))
      };

      await api.orders.create(orderData);
      
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Order failed:", error);
      setIsProcessing(false);
      alert("Order failed. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-forest" />
          </div>
          <h1 className="text-4xl font-display font-bold text-charcoal mb-4">Order Placed!</h1>
          <p className="text-charcoal/50 text-lg mb-10">
            Thank you for your order. We&apos;ll send a confirmation email with delivery details shortly.
          </p>
          <div className="space-y-4">
            <Link href="/dashboard/orders" className="btn-primary w-full justify-center py-4">
              View Order History
            </Link>
            <Link href="/" className="inline-block text-forest font-bold hover:underline">
              Return to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFCF9] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/fruits" className="inline-flex items-center gap-2 text-charcoal/40 hover:text-forest font-bold text-sm mb-12 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to shopping
        </Link>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left: Forms */}
          <div className="lg:col-span-7 space-y-8">
            {/* Stepper */}
            <div className="flex items-center gap-4 mb-12">
              <Step number={1} active={step >= 1} label="Shipping" />
              <div className="h-px bg-sage/20 flex-1" />
              <Step number={2} active={step >= 2} label="Payment" />
              <div className="h-px bg-sage/20 flex-1" />
              <Step number={3} active={step >= 3} label="Review" />
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-[3rem] p-10 shadow-premium border border-sage/5">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Delivery Details</h2>
                      <p className="text-charcoal/40 font-medium">Where should we deliver your fresh produce?</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input label="First Name" placeholder="Nina" />
                      <Input label="Last Name" placeholder="Chowdhury" />
                      <div className="sm:col-span-2">
                        <Input label="Company Name" placeholder="Grameenphone Ltd" />
                      </div>
                      <div className="sm:col-span-2">
                        <Input label="Delivery Area" placeholder="Gulshan 1, Dhaka" icon={MapPin} />
                      </div>
                      <Input label="Building / Floor" placeholder="Level 4, House 12" icon={Building} />
                      <Input label="Contact Phone" placeholder="+880 1XXX-XXXXXX" icon={Smartphone} />
                    </div>

                    <button 
                      onClick={() => setStep(2)}
                      className="btn-primary w-full justify-center py-5 mt-4"
                    >
                      Continue to Payment <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Payment Method</h2>
                      <p className="text-charcoal/40 font-medium">Choose your preferred way to pay.</p>
                    </div>

                    <div className="space-y-4">
                      <PaymentOption 
                        id="cod" 
                        title="Cash on Delivery" 
                        desc="Pay when your order arrives at your office." 
                        icon={Truck}
                        selected 
                      />
                      <PaymentOption 
                        id="bkash" 
                        title="Bkash / Rocket" 
                        desc="Digital payment via local mobile wallet." 
                        icon={Smartphone}
                      />
                      <PaymentOption 
                        id="card" 
                        title="Credit / Debit Card" 
                        desc="Visa, Mastercard, or Amex." 
                        icon={CreditCard}
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 rounded-full border border-sage/20 text-charcoal/50 font-bold hover:bg-cream transition-all"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setStep(3)}
                        className="flex-[2] btn-primary justify-center py-5"
                      >
                        Review Order <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-display font-bold text-charcoal mb-2">Final Review</h2>
                      <p className="text-charcoal/40 font-medium">Double-check everything before confirming.</p>
                    </div>

                    <div className="p-6 rounded-3xl bg-forest/5 border border-forest/10 space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-charcoal/40 font-medium uppercase tracking-widest">Shipping to</span>
                        <span className="text-charcoal font-bold">Grameenphone Ltd, Gulshan 1</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-charcoal/40 font-medium uppercase tracking-widest">Payment via</span>
                        <span className="text-charcoal font-bold">Cash on Delivery</span>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                      <button 
                        onClick={() => setStep(2)}
                        className="flex-1 py-4 rounded-full border border-sage/20 text-charcoal/50 font-bold hover:bg-cream transition-all"
                      >
                        Back
                      </button>
                      <button 
                        onClick={handleCompleteOrder}
                        disabled={isProcessing}
                        className="flex-[2] btn-primary justify-center py-5 disabled:opacity-50"
                      >
                        {isProcessing ? "Processing..." : "Confirm & Pay Now"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 bg-white rounded-[3rem] p-10 shadow-premium border border-sage/5">
              <h3 className="text-2xl font-display font-bold text-charcoal mb-8">Order Summary</h3>
              
              <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                {items.length === 0 ? (
                  <p className="text-charcoal/30 font-medium italic">Your cart is empty.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.product.id + item.purchaseType} className="flex gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-cream/30 shrink-0 border border-sage/5 relative">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-charcoal truncate">{item.product.name}</h4>
                        <p className="text-[10px] font-bold text-forest uppercase tracking-widest mt-1">
                          {item.purchaseType} {item.purchaseType === "subscription" && `· ${item.frequency}`}
                        </p>
                        <p className="text-xs text-charcoal/40 mt-1">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-charcoal">
                          {formatPrice((item.purchaseType === "test" ? 0 : (
                            item.purchaseType === "subscription" && item.frequency
                              ? item.product.subscriptionPrices[item.frequency]
                              : item.product.price
                          )) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-4 pt-8 border-t border-sage/10">
                <div className="flex justify-between text-charcoal/50 font-medium">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-charcoal/50 font-medium">
                  <span>Delivery</span>
                  <span className="text-emerald-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <div>
                    <p className="text-sm font-bold text-charcoal/30 uppercase tracking-widest">Grand Total</p>
                    <p className="text-4xl font-display font-black text-charcoal">{formatPrice(total)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 rounded-3xl bg-sage/5 border border-sage/10 flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-forest shrink-0" />
                <p className="text-[10px] text-charcoal/40 font-bold uppercase tracking-widest leading-relaxed">
                  Your data is protected by industry standard encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ number, active, label }: { number: number, active: boolean, label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500",
        active ? "bg-forest text-white shadow-lg" : "bg-sage/10 text-charcoal/20"
      )}>
        {number}
      </div>
      <span className={cn(
        "text-[10px] font-bold uppercase tracking-widest transition-colors duration-500",
        active ? "text-charcoal" : "text-charcoal/20"
      )}>{label}</span>
    </div>
  );
}

function Input({ label, placeholder, icon: Icon }: any) {
  return (
    <div>
      <label className="block text-xs font-bold text-charcoal/30 uppercase tracking-widest mb-2 ml-1">{label}</label>
      <div className="relative group">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/20 group-focus-within:text-forest transition-colors" />}
        <input 
          type="text" 
          placeholder={placeholder}
          className={cn(
            "w-full py-4 rounded-2xl bg-cream border-2 border-sage/5 text-charcoal font-medium focus:outline-none focus:border-forest/30 transition-all",
            Icon ? "pl-11 pr-4" : "px-4"
          )}
        />
      </div>
    </div>
  );
}

function PaymentOption({ id, title, desc, icon: Icon, selected }: any) {
  return (
    <div className={cn(
      "p-6 rounded-3xl border-2 transition-all cursor-pointer group",
      selected ? "border-forest bg-forest/5 shadow-md" : "border-sage/5 bg-cream hover:border-sage/20"
    )}>
      <div className="flex gap-4">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
          selected ? "bg-forest text-white" : "bg-white text-charcoal/20 group-hover:text-forest"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-charcoal">{title}</h4>
          <p className="text-xs text-charcoal/40 font-medium mt-1">{desc}</p>
        </div>
        {selected && (
          <div className="ml-auto">
            <CheckCircle2 className="w-5 h-5 text-forest" />
          </div>
        )}
      </div>
    </div>
  );
}
