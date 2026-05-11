"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck,
  Smartphone
} from "lucide-react";
import { cn } from "@/lib/utils";

const METHODS = [
  { id: 1, type: "Card", last4: "4242", expiry: "12/28", brand: "Visa", isDefault: true },
  { id: 2, type: "Mobile", last4: "017XXXXXX88", expiry: "Bkash", brand: "Bkash", isDefault: false },
];

export default function UserPaymentPage() {
  const [methods, setMethods] = useState(METHODS);

  const addMethod = () => {
    const type = window.prompt("Add method type (Card/Mobile):", "Card");
    if (!type) return;
    const last4 = window.prompt("Last 4 digits (or phone mask):", "0000");
    if (!last4) return;
    const brand = type.toLowerCase() === "mobile" ? "Bkash" : "Visa";
    const newMethod = {
      id: Date.now(),
      type,
      last4,
      expiry: type.toLowerCase() === "mobile" ? "Bkash" : "12/30",
      brand,
      isDefault: methods.length === 0,
    };
    setMethods((prev) => [...prev, newMethod]);
  };

  const removeMethod = (id: number) => {
    setMethods((prev) => {
      const filtered = prev.filter((m) => m.id !== id);
      if (filtered.length > 0 && !filtered.some((m) => m.isDefault)) {
        filtered[0] = { ...filtered[0], isDefault: true };
      }
      return filtered;
    });
  };

  const setDefault = (id: number) => {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-charcoal">Payment Methods</h2>
          <p className="text-charcoal/40 font-medium italic">Manage how you pay for your office deliveries.</p>
        </div>
        <button onClick={addMethod} className="btn-primary py-3 px-6 shadow-xl hover:shadow-forest/20">
          <Plus className="w-5 h-5" /> Add New Method
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {methods.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-8 rounded-[2.5rem] bg-white shadow-premium border transition-all relative overflow-hidden",
              m.isDefault ? "border-forest/20" : "border-sage/5 hover:border-sage/20"
            )}
          >
            <div className="flex justify-between items-start mb-10">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                m.brand === "Visa" ? "bg-blue-50 text-blue-600" : "bg-rose-50 text-rose-600"
              )}>
                {m.type === "Card" ? <CreditCard className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
              </div>
              {m.isDefault && (
                <span className="px-3 py-1 rounded-full bg-forest/10 text-forest text-[10px] font-bold uppercase tracking-widest">
                  Default
                </span>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-lg font-bold text-charcoal">
                {m.brand} {m.type === "Card" ? `•••• ${m.last4}` : m.last4}
              </p>
              <p className="text-sm text-charcoal/40 font-medium">
                {m.type === "Card" ? `Expires ${m.expiry}` : "Mobile Wallet"}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-sage/5 flex items-center justify-between">
              <button onClick={() => removeMethod(m.id)} className="text-xs font-bold text-charcoal/30 hover:text-rose-500 transition-colors uppercase tracking-widest flex items-center gap-2">
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
              {!m.isDefault && (
                <button onClick={() => setDefault(m.id)} className="text-xs font-bold text-forest hover:underline uppercase tracking-widest">
                  Set as Default
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-sage/5 rounded-[3rem] p-10 border border-sage/10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-forest shadow-xl shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-display font-bold text-charcoal mb-1">Your data is safe</h3>
            <p className="text-sm text-charcoal/50 leading-relaxed">
              We use bank-level encryption to protect your payment details. GreenCrate never stores your full card number on our servers.
            </p>
          </div>
          <div className="flex items-center gap-4 grayscale opacity-40">
            <span className="text-xs font-black italic">VISA</span>
            <span className="text-xs font-black italic">Mastercard</span>
            <span className="text-xs font-black italic">SSLCommerz</span>
          </div>
        </div>
      </div>
    </div>
  );
}
