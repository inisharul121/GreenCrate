"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Calendar,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  AlertTriangle
} from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { api } from "@/lib/api";

const STATUS_COLORS: Record<string, string> = {
  "Delivered": "bg-emerald-50 text-emerald-600 border-emerald-100",
  "Processing": "bg-amber-50 text-amber-600 border-amber-100",
  "Shipped": "bg-blue-50 text-blue-600 border-blue-100",
  "Cancelled": "bg-rose-50 text-rose-600 border-rose-100",
  "pending": "bg-gray-50 text-gray-600 border-gray-100",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await api.admin.getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(o => 
    filter === "All" || o.status.toLowerCase() === filter.toLowerCase()
  );

  if (loading) return <div className="p-8 text-charcoal/40">Loading orders...</div>;

  const exportCsv = () => {
    const headers = ["Order ID", "Customer", "Date", "Status", "Total"];
    const rows = filteredOrders.map((o) => [
      o.id,
      o.customer_name || "Guest",
      new Date(o.created_at).toLocaleDateString(),
      o.status,
      o.total_amount,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "orders-export.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-charcoal">Global Orders</h2>
          <p className="text-charcoal/40 font-medium">Monitor and manage all incoming orders across Bangladesh.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-sage/10 text-charcoal font-bold text-sm hover:bg-cream transition-all">
            <Calendar className="w-4 h-4 text-forest" /> Today
          </button>
          <button onClick={exportCsv} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-forest text-white font-bold text-sm hover:bg-forest-light transition-all shadow-lg shadow-forest/10">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-sage/10">
        {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "px-6 py-3 rounded-t-2xl text-sm font-bold transition-all relative",
              filter === s ? "text-forest" : "text-charcoal/30 hover:text-charcoal"
            )}
          >
            {s}
            {filter === s && (
              <motion.div layoutId="order-tab" className="absolute bottom-0 left-0 right-0 h-1 bg-forest rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white rounded-[2.5rem] shadow-premium border border-sage/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest border-b border-sage/10">
                <th className="px-8 py-6">Order ID</th>
                <th className="px-8 py-6">Customer / Items</th>
                <th className="px-8 py-6">Date</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Total</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage/5">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-charcoal/30 font-medium italic">No orders found matching this filter.</td>
                </tr>
              ) : filteredOrders.map((order, i) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-forest/5 transition-colors"
                >
                  <td className="px-8 py-6 text-sm font-black text-charcoal">{order.id}</td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-charcoal">{order.customer_name || "Guest"}</p>
                    <p className="text-[10px] text-charcoal/40 font-medium truncate max-w-[200px] mt-1">{order.items_summary}</p>
                  </td>
                  <td className="px-8 py-6 text-sm text-charcoal/60 font-medium">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      STATUS_COLORS[order.status] || "bg-gray-50 text-gray-600 border-gray-100"
                    )}>
                      {order.status === "processing" && <Clock className="w-2.5 h-2.5 inline mr-1" />}
                      {order.status === "shipped" && <Truck className="w-2.5 h-2.5 inline mr-1" />}
                      {order.status === "delivered" && <CheckCircle2 className="w-2.5 h-2.5 inline mr-1" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-forest">{formatPrice(order.total_amount)}</td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => window.alert(`Order ${order.id}\n\n${order.items_summary || "No item summary available."}`)}
                      className="p-2 rounded-xl bg-forest/5 text-forest hover:bg-forest hover:text-white transition-all shadow-sm"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
