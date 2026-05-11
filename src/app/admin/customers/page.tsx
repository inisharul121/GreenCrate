"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Users, 
  MoreVertical, 
  Mail, 
  Phone,
  Building,
  CheckCircle2,
  Clock,
  ExternalLink
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { api } from "@/lib/api";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data = await api.admin.getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8 text-charcoal/40">Loading customers...</div>;

  const emailAllHref = `mailto:?bcc=${encodeURIComponent(
    filteredCustomers.map((c) => c.email).join(",")
  )}&subject=${encodeURIComponent("GreenCrate Update")}`;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-charcoal">Customer Directory</h2>
          <p className="text-charcoal/40 font-medium italic">Manage relationships and monitor customer lifetime value.</p>
        </div>
        <div className="flex gap-3">
          <a href={emailAllHref} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-sage/10 text-charcoal font-bold text-sm hover:bg-cream transition-all">
            <Mail className="w-4 h-4 text-forest" /> Email All
          </a>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 group-focus-within:text-forest transition-colors" />
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white border border-sage/10 focus:outline-none focus:border-forest/30 transition-all text-sm"
        />
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-premium border border-sage/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-forest/5 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Joined Date</th>
                <th className="px-8 py-6 text-right">Orders</th>
                <th className="px-8 py-6 text-right">Total Value</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage/5">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-charcoal/30 font-medium italic">No customers found.</td>
                </tr>
              ) : filteredCustomers.map((c, i) => (
                <motion.tr 
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-forest/5 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-forest/5 text-forest flex items-center justify-center font-bold text-sm border border-forest/10 uppercase">
                        {c.name.substring(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal">{c.name}</p>
                        <p className="text-[10px] text-charcoal/30 font-medium">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-sm text-charcoal/60 font-medium">
                      {new Date(c.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right font-bold text-charcoal text-sm">{c.order_count}</td>
                  <td className="px-8 py-5 text-right font-bold text-forest text-sm">{formatPrice(c.total_spend)}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a href={`mailto:${c.email}`} className="p-2 rounded-lg text-charcoal/30 hover:bg-white hover:text-forest transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => window.alert(`Customer: ${c.name}\nEmail: ${c.email}\nOrders: ${c.order_count}`)}
                        className="p-2 rounded-lg text-charcoal/30 hover:bg-white hover:text-charcoal transition-all"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
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
