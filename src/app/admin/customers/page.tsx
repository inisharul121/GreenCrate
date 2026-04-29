"use client";

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
import { cn } from "@/lib/utils";

const CUSTOMERS = [
  { id: 1, name: "Ariful Islam", company: "Grameenphone Ltd", email: "arif@gp.com.bd", status: "Active", orders: 12, value: 42500, avatar: "AI" },
  { id: 2, name: "Nina Chowdhury", company: "Pathao", email: "nina@pathao.com", status: "Active", orders: 8, value: 28900, avatar: "NC" },
  { id: 3, name: "Rahat Ahmed", company: "ShopUp", email: "rahat@shopup.com.bd", status: "Inactive", orders: 3, value: 8400, avatar: "RA" },
  { id: 4, name: "Sultana Ahmed", company: "BRAC", email: "sultana@brac.net", status: "Active", orders: 20, value: 105000, avatar: "SA" },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-bold text-charcoal">Customer Directory</h2>
          <p className="text-charcoal/40 font-medium italic">Manage relationships and monitor customer lifetime value.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-sage/10 text-charcoal font-bold text-sm hover:bg-cream transition-all">
            <Mail className="w-4 h-4 text-forest" /> Email All
          </button>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 group-focus-within:text-forest transition-colors" />
        <input 
          type="text" 
          placeholder="Search by name, company, or email..." 
          className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white border border-sage/10 focus:outline-none focus:border-forest/30 transition-all text-sm"
        />
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-premium border border-sage/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-forest/5 text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Company</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Orders</th>
                <th className="px-8 py-6 text-right">Total Value</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage/5">
              {CUSTOMERS.map((c, i) => (
                <motion.tr 
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-forest/5 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-forest/5 text-forest flex items-center justify-center font-bold text-sm border border-forest/10">
                        {c.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal">{c.name}</p>
                        <p className="text-[10px] text-charcoal/30 font-medium">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-sm text-charcoal/60 font-medium">
                      <Building className="w-3.5 h-3.5 opacity-30" />
                      {c.company}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      c.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-charcoal/5 text-charcoal/40 border-charcoal/5"
                    )}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right font-bold text-charcoal text-sm">{c.orders}</td>
                  <td className="px-8 py-5 text-right font-bold text-forest text-sm">৳ {c.value.toLocaleString()}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg text-charcoal/30 hover:bg-white hover:text-forest transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-charcoal/30 hover:bg-white hover:text-charcoal transition-all">
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
