"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Settings, 
  Pause, 
  Play, 
  RefreshCw, 
  Leaf,
  Clock
} from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { api } from "@/lib/api";
import Link from "next/link";

export default function UserSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const userId = "1"; // Mock user ID

  const fetchSubscriptions = useCallback(async () => {
    try {
      const data = await api.users.getSubscriptions(userId);
      setSubscriptions(data);
    } catch (error) {
      console.error("Failed to fetch user subscriptions:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const handlePauseOrResume = async (subscription: any) => {
    setActionLoading(String(subscription.id));
    try {
      if (subscription.status === "paused") {
        await api.users.resumeSubscription(userId, subscription.id);
      } else {
        await api.users.pauseSubscription(userId, subscription.id);
      }
      await fetchSubscriptions();
    } catch (error) {
      console.error("Failed to update subscription status:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (subscriptionId: string | number) => {
    setActionLoading(String(subscriptionId));
    try {
      await api.users.cancelSubscription(userId, subscriptionId);
      await fetchSubscriptions();
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const formatNextDelivery = (dateValue?: string | null) => {
    if (!dateValue) return "Calculated automatically";
    return new Date(dateValue).toLocaleDateString();
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  if (loading) return <div className="p-8 text-charcoal/40 font-medium">Loading your subscriptions...</div>;

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
        {subscriptions.length === 0 ? (
          <div className="p-20 text-center bg-white rounded-[3rem] border border-dashed border-sage/20">
            <Calendar className="w-16 h-16 text-sage/20 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-charcoal/40 mb-2">No active subscriptions</h3>
            <p className="text-charcoal/30 mb-8">Save up to 15% on your office produce by starting a subscription today.</p>
            <Link href="/fruits" className="btn-primary px-10 py-3 shadow-lg shadow-forest/10">Browse Options</Link>
          </div>
        ) : subscriptions.map((sub, i) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white p-10 rounded-[3rem] shadow-premium border border-sage/5 hover:border-forest/20 transition-all flex flex-col lg:flex-row lg:items-center gap-12 relative overflow-hidden"
          >
            {sub.status === "active" ? (
              <div className="absolute top-0 right-0 w-32 h-32 bg-forest/5 rounded-bl-[5rem] -mr-8 -mt-8" />
            ) : null}
            
            <div className="flex-1 space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                  sub.status === "active" ? "bg-forest text-white shadow-lg shadow-forest/10" : "bg-charcoal/5 text-charcoal/20"
                )}>
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-2xl font-display font-bold text-charcoal">{sub.name}</h3>
                    <span className={cn(
                      "px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                      sub.status === "active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-charcoal/5 text-charcoal/40"
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
                    <p className="text-sm font-bold text-charcoal">{formatNextDelivery(sub.next_delivery_date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Leaf className="w-5 h-5 text-charcoal/20" />
                  <div>
                    <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest leading-none mb-1">Started On</p>
                    <p className="text-sm font-bold text-emerald-600">{new Date(sub.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-72 space-y-4 relative z-10">
              <div className="p-6 rounded-3xl bg-forest/5 border border-forest/10 flex items-center justify-between">
                <p className="text-[10px] font-bold text-forest uppercase tracking-widest">Billing</p>
                <p className="text-xl font-display font-bold text-charcoal">{formatPrice(sub.price || sub.base_price)}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handlePauseOrResume(sub)}
                  disabled={sub.status === "cancelled" || actionLoading === String(sub.id)}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-sage/10 text-charcoal/50 font-bold text-xs hover:bg-cream transition-all group disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {sub.status === "paused" ? (
                    <Play className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Pause className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  )}
                  {sub.status === "paused" ? "Resume" : "Pause"}
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-sage/10 text-charcoal/50 font-bold text-xs hover:bg-cream transition-all group">
                  <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" /> Modify
                </button>
              </div>
              <button
                onClick={() => handleCancel(sub.id)}
                disabled={sub.status === "cancelled" || actionLoading === String(sub.id)}
                className="w-full py-3 text-xs font-bold text-charcoal/30 hover:text-rose-500 transition-colors uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
              >
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
