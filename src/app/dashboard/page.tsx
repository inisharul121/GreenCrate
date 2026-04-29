"use client";

import { motion } from "framer-motion";
import { 
  Package, 
  Calendar, 
  CreditCard, 
  Settings, 
  ArrowRight,
  Leaf,
  Clock
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const ACTIVE_SUBSCRIPTIONS = [
  { id: "sub-1", name: "Classic Fruit Box", frequency: "Weekly", nextDelivery: "Tomorrow, 8:00 AM", status: "Confirmed" },
  { id: "sub-2", name: "Artisan Coffee Box", frequency: "Bi-weekly", nextDelivery: "May 5, 2026", status: "Upcoming" },
];

export default function UserDashboard() {
  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-display font-bold text-charcoal mb-2">Hello, Nina! 👋</h2>
          <p className="text-charcoal/50 font-medium italic">Savor the goodness of local Bangladeshi produce.</p>
        </div>
        <div className="flex items-center gap-4 bg-sage/10 px-6 py-4 rounded-3xl border border-sage/10">
          <Leaf className="w-6 h-6 text-forest" />
          <div>
            <p className="text-[10px] font-bold text-forest uppercase tracking-widest leading-none mb-1">Impact Score</p>
            <p className="text-lg font-bold text-charcoal">42 kg CO₂ saved</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Active Subs & Last Order */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Subscriptions Card */}
          <section className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-sage/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-bl-[5rem] -mr-8 -mt-8" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-2xl font-display font-bold text-charcoal">Active Subscriptions</h3>
              <Link href="/dashboard/subscriptions" className="text-sm font-bold text-forest hover:underline">Manage All</Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {ACTIVE_SUBSCRIPTIONS.map((sub, i) => (
                <motion.div 
                  key={sub.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-3xl bg-forest/5 border border-forest/10 hover:border-forest/30 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Calendar className="w-5 h-5 text-forest" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-forest text-white text-[10px] font-bold uppercase tracking-wider">
                      {sub.status}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-charcoal mb-1">{sub.name}</h4>
                  <p className="text-xs text-charcoal/40 font-medium mb-4">{sub.frequency} Delivery</p>
                  <div className="flex items-center gap-2 pt-4 border-t border-forest/10">
                    <Clock className="w-3.5 h-3.5 text-forest/40" />
                    <span className="text-xs font-bold text-charcoal/60">Next: {sub.nextDelivery}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Last Order Summary */}
          <section className="bg-charcoal rounded-[2.5rem] p-8 text-white relative overflow-hidden">
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-forest/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-display font-bold">Last Delivery</h3>
                <span className="text-white/40 text-sm font-medium">April 24, 2026</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 shrink-0">
                  <img src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200&q=80" alt="Order" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Corporate Mega Box</h4>
                  <p className="text-white/50 text-sm mt-1">Delivered to Main Lobby Reception</p>
                  <div className="flex items-center gap-4 mt-4">
                    <button className="text-xs font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all">Download Invoice</button>
                    <button className="text-xs font-bold text-sage hover:text-white transition-all flex items-center gap-1">Rate Delivery <ArrowRight className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Quick Links & Profile Info */}
        <div className="space-y-8">
          <section className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-sage/5">
            <h3 className="text-xl font-display font-bold text-charcoal mb-6">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: "My Orders", icon: Package, href: "/dashboard/orders" },
                { label: "Payment Methods", icon: CreditCard, href: "/dashboard/payment" },
                { label: "Profile Settings", icon: Settings, href: "/dashboard/settings" },
              ].map((link) => (
                <Link 
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-forest/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-white transition-all">
                      <link.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-charcoal">{link.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-charcoal/20 group-hover:text-forest group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </section>

          <section className="bg-sage-gradient rounded-[2.5rem] p-8 text-white text-center">
            <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center border-4 border-white/10 shadow-xl backdrop-blur-md">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-xl font-display font-bold mb-2">Refer a Partner</h4>
            <p className="text-white/70 text-sm mb-6 leading-relaxed">Refer another office and both get 20% off your next month.</p>
            <button className="w-full py-3 bg-white text-forest font-bold rounded-2xl hover:bg-cream transition-all shadow-lg">Get Invite Link</button>
          </section>
        </div>
      </div>
    </div>
  );
}
