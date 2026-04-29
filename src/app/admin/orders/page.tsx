"use client";

import { useState } from "react";
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

const ALL_ORDERS = [
  { id: "ORD-7291", customer: "Grameenphone Ltd", items: "Classic Fruit Box (x4)", total: 12450, status: "Delivered", date: "Apr 29, 2026", payment: "Bkash" },
  { id: "ORD-7290", customer: "Pathao", items: "Meeting Lunchbag (x10)", total: 34900, status: "Processing", date: "Apr 29, 2026", payment: "Card" },
  { id: "ORD-7289", customer: "BRAC", items: "Corporate Gift Box (x25)", total: 82500, status: "Shipped", date: "Apr 28, 2026", payment: "Invoice" },
  { id: "ORD-7288", customer: "Bkash", items: "Sample Fruit Box (x1)", total: 0, status: "Delivered", date: "Apr 28, 2026", payment: "Free" },
  { id: "ORD-7287", customer: "BSRM", items: "Executive Lunchbag (x8)", total: 18900, status: "Delivered", date: "Apr 27, 2026", payment: "Card" },
  { id: "ORD-7286", customer: "ShopUp", items: "Premium Fruit Box (x2)", total: 6980, status: "Processing", date: "Apr 27, 2026", payment: "Bkash" },
  { id: "ORD-7285", customer: "Sheba.xyz", items: "Pastry Platter (x3)", total: 12600, status: "Delivered", date: "Apr 26, 2026", payment: "Card" },
];

const STATUS_COLORS: Record<string, string> = {
  "Delivered": "bg-emerald-50 text-emerald-600 border-emerald-100",
  "Processing": "bg-amber-50 text-amber-600 border-amber-100",
  "Shipped": "bg-blue-50 text-blue-600 border-blue-100",
  "Cancelled": "bg-rose-50 text-rose-600 border-rose-100",
};

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState("All");

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
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-forest text-white font-bold text-sm hover:bg-forest-light transition-all shadow-lg shadow-forest/10">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-sage/10">
        {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map(s => (
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
                <th className="px-8 py-6">Payment</th>
                <th className="px-8 py-6">Total</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage/5">
              {ALL_ORDERS.map((order, i) => (
                <motion.tr 
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-forest/5 transition-colors"
                >
                  <td className="px-8 py-6 text-sm font-black text-charcoal">{order.id}</td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-charcoal">{order.customer}</p>
                    <p className="text-[10px] text-charcoal/40 font-medium truncate max-w-[200px] mt-1">{order.items}</p>
                  </td>
                  <td className="px-8 py-6 text-sm text-charcoal/60 font-medium">{order.date}</td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      STATUS_COLORS[order.status]
                    )}>
                      {order.status === "Processing" && <Clock className="w-2.5 h-2.5 inline mr-1" />}
                      {order.status === "Shipped" && <Truck className="w-2.5 h-2.5 inline mr-1" />}
                      {order.status === "Delivered" && <CheckCircle2 className="w-2.5 h-2.5 inline mr-1" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-charcoal/40 uppercase tracking-widest">{order.payment}</td>
                  <td className="px-8 py-6 text-sm font-bold text-forest">{formatPrice(order.total)}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 rounded-xl bg-forest/5 text-forest hover:bg-forest hover:text-white transition-all shadow-sm">
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
