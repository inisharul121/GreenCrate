"use client";

import { motion } from "framer-motion";
import { 
  Calendar, 
  Settings, 
  Pause, 
  Play, 
  RefreshCw, 
  Leaf,
  Clock,
  ChevronRight
} from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import Link from "next/link";

const MY_SUBS = [
  { id: "sub-1", name: "Classic Fruit Box", frequency: "Weekly", price: 3490, nextDelivery: "Tomorrow, 8:00 AM", status: "Active", saved: 523 },
  { id: "sub-2", name: "Artisan Coffee Box", frequency: "Bi-weekly", price: 2100, nextDelivery: "May 5, 2026", status: "Paused", saved: 315 },
];

export default function UserSubscriptionsPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-charcoal">My Subscriptions</h2>
          <p className="text-charcoal/40 font-medium italic">Manage your recurring office happiness.</p>
        </div>
        <Link href="/fruits" className="btn-primary py-3 px-6 shadow-xl hover:shadow-forest/20">
          <Leaf className="w-5 h-5" /> Browse Subscription Boxes
        </Link>
      </div>

      <div className="grid gap-8">
        {MY_SUBS.map((sub, i) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white p-10 rounded-[3rem] shadow-premium border border-sage/5 hover:border-forest/20 transition-all flex flex-col lg:flex-row lg:items-center gap-12 relative overflow-hidden"
          >
            {sub.status === "Active" && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-bl-[5rem] -mr-8 -mt-8" />
            )}
            
            <div className="flex-1 space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                  sub.status === "Active" ? "bg-forest text-white shadow-lg shadow-forest/10" : "bg-charcoal/5 text-charcoal/20"
                )}>
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-2xl font-display font-bold text-charcoal">{sub.name}</h3>
                    <span className={cn(
                      "px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                      sub.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-charcoal/5 text-charcoal/40"
                    )}>
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-forest uppercase tracking-widest">{sub.frequency} Delivery</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 pt-4 border-t border-sage/5">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-charcoal/20" />
                  <div>
                    <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest leading-none mb-1">Next Delivery</p>
                    <p className="text-sm font-bold text-charcoal">{sub.nextDelivery}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-charcoal/20" />
                  <div>
                    <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest leading-none mb-1">Total Savings</p>
                    <p className="text-sm font-bold text-emerald-600">৳ {sub.saved} saved so far</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-72 space-y-4 relative z-10">
              <div className="p-6 rounded-3xl bg-forest/5 border border-forest/10 flex items-center justify-between">
                <p className="text-[10px] font-bold text-forest uppercase tracking-widest">Billing</p>
                <p className="text-xl font-display font-bold text-charcoal">{formatPrice(sub.price)}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-sage/10 text-charcoal/50 font-bold text-xs hover:bg-cream transition-all group">
                  {sub.status === "Active" ? (
                    <>
                      <Pause className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" /> Resume
                    </>
                  )}
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-sage/10 text-charcoal/50 font-bold text-xs hover:bg-cream transition-all group">
                  <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" /> Modify
                </button>
              </div>
              <button className="w-full py-3 text-xs font-bold text-charcoal/30 hover:text-rose-500 transition-colors uppercase tracking-widest">
                Cancel Subscription
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-[3rem] p-12 bg-sage/5 border border-sage/10 flex flex-col md:flex-row items-center gap-10">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-forest shadow-xl shrink-0">
          <Settings className="w-10 h-10 animate-spin-slow" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-2xl font-display font-bold text-charcoal mb-2">Need a custom plan?</h4>
          <p className="text-charcoal/50 leading-relaxed">For offices with more than 100 employees, we offer custom billing, dedicated account managers, and tailored produce selections.</p>
        </div>
        <button className="btn-primary px-10 py-4 shadow-lg shadow-forest/10">Talk to Sales</button>
      </div>
    </div>
  );
}
