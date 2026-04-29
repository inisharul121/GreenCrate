"use client";

import { motion } from "framer-motion";
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Activity, 
  ArrowUpRight,
  MoreVertical
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { formatPrice } from "@/lib/utils";

const RECENT_ORDERS = [
  { id: "#ORD-7291", customer: "Grameenphone", items: 4, total: 12450, status: "Delivered", date: "Today, 10:45 AM" },
  { id: "#ORD-7290", customer: "Pathao", items: 2, total: 3490, status: "Processing", date: "Today, 09:12 AM" },
  { id: "#ORD-7289", customer: "BRAC", items: 12, total: 42000, status: "Shipped", date: "Yesterday" },
  { id: "#ORD-7288", customer: "Bkash", items: 1, total: 0, status: "Test Order", date: "Yesterday" },
  { id: "#ORD-7287", customer: "BSRM", items: 6, total: 18900, status: "Delivered", date: "2 days ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-3xl font-display font-bold text-charcoal">Welcome back, Nina!</h2>
        <p className="text-charcoal/40 font-medium">Here's what's happening with GreenCrate today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Revenue" 
          value={formatPrice(452890)} 
          change="+12.5%" 
          trend="up" 
          icon={DollarSign} 
          color="forest" 
        />
        <StatCard 
          label="Active Orders" 
          value="142" 
          change="+8.2%" 
          trend="up" 
          icon={ShoppingBag} 
          color="sage" 
        />
        <StatCard 
          label="New Customers" 
          value="24" 
          change="-2.4%" 
          trend="down" 
          icon={Users} 
          color="amber" 
        />
        <StatCard 
          label="Subscription Rate" 
          value="84%" 
          change="+4.1%" 
          trend="up" 
          icon={Activity} 
          color="forest" 
        />
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-premium border border-sage/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-display font-bold text-charcoal">Recent Orders</h3>
            <button className="text-sm font-bold text-forest hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest border-b border-sage/10">
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage/5">
                {RECENT_ORDERS.map((order, i) => (
                  <motion.tr 
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group hover:bg-forest/5 transition-colors"
                  >
                    <td className="py-4 font-bold text-sm text-charcoal">{order.id}</td>
                    <td className="py-4">
                      <p className="text-sm font-bold text-charcoal">{order.customer}</p>
                      <p className="text-xs text-charcoal/30 font-medium">{order.date}</p>
                    </td>
                    <td className="py-4 text-sm font-bold text-forest">{formatPrice(order.total)}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === "Delivered" ? "bg-emerald-50 text-emerald-600" :
                        order.status === "Processing" ? "bg-amber-50 text-amber-600" :
                        order.status === "Shipped" ? "bg-blue-50 text-blue-600" :
                        "bg-charcoal/5 text-charcoal/40"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-charcoal/30 hover:bg-white hover:text-charcoal transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Products Mock */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-sage/5">
          <h3 className="text-xl font-display font-bold text-charcoal mb-8">Quick Actions</h3>
          <div className="grid gap-3">
            {[
              { label: "Add New Product", icon: ShoppingBag, color: "bg-forest text-white" },
              { label: "Export Sales Report", icon: Activity, color: "bg-sage text-white" },
              { label: "Manage Subscriptions", icon: Activity, color: "bg-amber text-charcoal" },
              { label: "Update Delivery Zones", icon: Activity, color: "bg-charcoal text-white" },
            ].map((action) => (
              <button 
                key={action.label}
                className="flex items-center gap-4 p-4 rounded-2xl border border-sage/10 hover:border-forest/30 hover:bg-forest/5 transition-all text-left group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-charcoal group-hover:text-forest transition-colors">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
