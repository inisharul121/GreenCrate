"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const data = await api.admin.getSubscriptions();
        setSubscriptions(data);
      } catch (error) {
        console.error("Failed to fetch admin subscriptions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubscriptions();
  }, []);

  const filtered = useMemo(() => {
    if (statusFilter === "all") return subscriptions;
    return subscriptions.filter((s) => s.status === statusFilter);
  }, [subscriptions, statusFilter]);

  if (loading) return <div className="p-8 text-charcoal/40">Loading subscriptions...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-display font-bold text-charcoal">Subscription Management</h2>
        <p className="text-charcoal/40 font-medium">Monitor active, paused, and cancelled subscriptions.</p>
      </div>

      <div className="flex items-center gap-2">
        {["all", "active", "paused", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all",
              statusFilter === status
                ? "bg-forest text-white border-forest"
                : "bg-white text-charcoal/50 border-sage/10"
            )}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] border border-sage/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-charcoal/40 bg-forest/5">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Frequency</th>
                <th className="px-6 py-4">Next Delivery</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-charcoal/40">No subscriptions found.</td>
                </tr>
              ) : filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-forest/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm text-charcoal">{sub.customer_name || "Guest"}</p>
                    <p className="text-xs text-charcoal/40">{sub.customer_email || "-"}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-charcoal">{sub.product_name || sub.product_id}</td>
                  <td className="px-6 py-4 text-sm text-charcoal/60 uppercase">{sub.frequency}</td>
                  <td className="px-6 py-4 text-sm text-charcoal/60">
                    {sub.next_delivery_date ? new Date(sub.next_delivery_date).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-sage/10 text-forest">
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
