"use client";

import { useState, useEffect } from "react";
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
import { api } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default function UserDashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const userId = "1"; // Mock user ID for demonstration

  useEffect(() => {
    async function fetchSummary() {
      try {
        const data = await api.users.getDashboardSummary(userId);
        setSummary(data);
      } catch (error) {
        console.error("Failed to fetch dashboard summary:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, []);

  if (loading) return <div className="p-8 text-charcoal/40 font-medium">Loading your dashboard...</div>;

  const downloadLastInvoice = () => {
    if (!summary?.lastOrder) return;
    const content = [
      `Invoice: ${summary.lastOrder.id}`,
      `Date: ${new Date(summary.lastOrder.created_at).toLocaleDateString()}`,
      `Product: ${summary.lastOrder.product_name || "Recent Order"}`,
      `Status: ${summary.lastOrder.status}`,
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${summary.lastOrder.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyInviteLink = async () => {
    const url = `${window.location.origin}/signup?ref=greencrate-user`;
    await navigator.clipboard.writeText(url);
    alert("Invite link copied to clipboard.");
  };

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
              {summary?.subscriptions?.length === 0 ? (
                <div className="sm:col-span-2 p-8 text-center text-charcoal/30 bg-forest/5 rounded-3xl border border-dashed border-forest/20">
                  <p className="font-bold mb-2">No active subscriptions</p>
                  <Link href="/fruits" className="text-forest text-sm hover:underline">Browse Products</Link>
                </div>
              ) : summary?.subscriptions?.map((sub: any, i: number) => (
                <motion.div 
                  key={sub.product_id}
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
                  <p className="text-xs text-charcoal/40 font-medium mb-4 uppercase tracking-widest">{sub.frequency} Delivery</p>
                  <div className="flex items-center gap-2 pt-4 border-t border-forest/10">
                    <Clock className="w-3.5 h-3.5 text-forest/40" />
                    <span className="text-xs font-bold text-charcoal/60">Started: {new Date(sub.created_at).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Last Order Summary */}
          {summary?.lastOrder && (
            <section className="bg-charcoal rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-forest/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-display font-bold">Last Delivery</h3>
                  <span className="text-white/40 text-sm font-medium">{new Date(summary.lastOrder.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 shrink-0 relative">
                    <Image src={summary.lastOrder.image || "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200&q=80"} alt="Order" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{summary.lastOrder.product_name || "Recent Order"}</h4>
                    <p className="text-white/50 text-sm mt-1">Status: <span className="text-forest font-bold uppercase">{summary.lastOrder.status}</span></p>
                    <div className="flex items-center gap-4 mt-4">
                      <button onClick={downloadLastInvoice} className="text-xs font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all">Download Invoice</button>
                      <Link href="/dashboard/orders" className="text-xs font-bold text-sage hover:text-white transition-all flex items-center gap-1">Track Delivery <ArrowRight className="w-3 h-3" /></Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
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
            <button onClick={copyInviteLink} className="w-full py-3 bg-white text-forest font-bold rounded-2xl hover:bg-cream transition-all shadow-lg">Get Invite Link</button>
          </section>
        </div>
      </div>
    </div>
  );
}
