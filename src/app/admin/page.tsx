"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  DollarSign, 
  ShoppingBag, 
  Users, 
  Activity, 
  ArrowUpRight,
  MoreVertical,
  Download
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { formatPrice } from "@/lib/utils";
import { api } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, ordersData] = await Promise.all([
          api.admin.getStats(),
          api.admin.getRecentOrders()
        ]);
        setStats(statsData);
        setRecentOrders(ordersData);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-charcoal/40">Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-3xl font-display font-bold text-charcoal">Welcome back, Nina!</h2>
        <p className="text-charcoal/40 font-medium">Here&apos;s what&apos;s happening with GreenCrate today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Revenue" 
          value={formatPrice(stats?.revenue || 0)} 
          change="+12.5%" 
          trend="up" 
          icon={DollarSign} 
          color="forest" 
        />
        <StatCard 
          label="Active Orders" 
          value={stats?.activeOrders?.toString() || "0"} 
          change="+8.2%" 
          trend="up" 
          icon={ShoppingBag} 
          color="sage" 
        />
        <StatCard 
          label="New Customers" 
          value={stats?.newCustomers?.toString() || "0"} 
          change="-2.4%" 
          trend="down" 
          icon={Users} 
          color="amber" 
        />
        <StatCard 
          label="Total Products" 
          value={stats?.totalProducts?.toString() || "0"} 
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
            <Link href="/admin/orders" className="text-sm font-bold text-forest hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest border-b border-sage/10">
                  <th className="pb-4">Order ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage/5">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-charcoal/30 font-medium italic">No orders yet.</td>
                  </tr>
                ) : recentOrders.map((order, i) => (
                  <motion.tr 
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group hover:bg-forest/5 transition-colors"
                  >
                    <td className="py-4 font-bold text-sm text-charcoal">{order.id}</td>
                    <td className="py-4">
                      <p className="text-sm font-bold text-charcoal">{order.customer_name || "Guest"}</p>
                      <p className="text-xs text-charcoal/30 font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4 text-sm font-bold text-forest">{formatPrice(order.total_amount)}</td>
                    <td className="py-4 text-right">
                      <Link
                        href={`/admin/orders?highlight=${order.id}`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-charcoal/30 hover:bg-white hover:text-charcoal transition-all"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-sage/5">
          <h3 className="text-xl font-display font-bold text-charcoal mb-8">Quick Actions</h3>
          <div className="grid gap-3">
              {[
              { label: "Add New Product", icon: ShoppingBag, color: "bg-forest text-white", href: "/admin/products" },
                { label: "Export Sales Report", icon: Download, color: "bg-sage text-white", href: "/admin/orders?export=csv" },
              { label: "Manage Subscriptions", icon: Activity, color: "bg-amber text-charcoal", href: "/admin/subscriptions" },
                { label: "Update Delivery Zones", icon: Activity, color: "bg-charcoal text-white", href: "/admin/settings" },
            ].map((action) => (
              <Link 
                key={action.label}
                href={action.href}
                className="flex items-center gap-4 p-4 rounded-2xl border border-sage/10 hover:border-forest/30 hover:bg-forest/5 transition-all text-left group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-charcoal group-hover:text-forest transition-colors">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
