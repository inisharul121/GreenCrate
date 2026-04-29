"use client";

import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  ChevronRight, 
  ArrowRight,
  Download,
  RotateCcw
} from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import Link from "next/link";

const MY_ORDERS = [
  { id: "ORD-7291", date: "Today", total: 3490, status: "Processing", items: "Classic Fruit Box (x1)" },
  { id: "ORD-7245", date: "Apr 24, 2026", total: 12450, status: "Delivered", items: "Executive Lunchbag (x4), Coffee Box (x1)" },
  { id: "ORD-7190", date: "Apr 10, 2026", total: 0, status: "Trial Complete", items: "Sample Fruit Box (x1)" },
  { id: "ORD-7122", date: "Mar 28, 2026", total: 3490, status: "Delivered", items: "Classic Fruit Box (x1)" },
];

export default function UserOrdersPage() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-display font-bold text-charcoal">My Order History</h2>
        <p className="text-charcoal/40 font-medium italic">Tracking all your fresh deliveries since March 2026.</p>
      </div>

      <div className="space-y-4">
        {MY_ORDERS.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white p-8 rounded-[2.5rem] shadow-premium border border-sage/5 hover:border-forest/20 transition-all flex flex-col md:flex-row md:items-center gap-8"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-black text-charcoal">{order.id}</span>
                <span className={cn(
                  "px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                  order.status === "Delivered" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                  order.status === "Processing" ? "bg-amber-50 text-amber-600 border-amber-100" :
                  "bg-charcoal/5 text-charcoal/40 border-charcoal/5"
                )}>
                  {order.status}
                </span>
              </div>
              <h3 className="font-bold text-charcoal mb-1">{order.items}</h3>
              <p className="text-xs text-charcoal/30 font-medium">Placed on {order.date}</p>
            </div>

            <div className="flex items-center gap-12">
              <div className="text-right">
                <p className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest mb-1">Total Paid</p>
                <p className="text-xl font-display font-bold text-forest">{formatPrice(order.total)}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="w-11 h-11 rounded-xl bg-forest/5 text-forest flex items-center justify-center hover:bg-forest hover:text-white transition-all shadow-sm" title="Download Invoice">
                  <Download className="w-5 h-5" />
                </button>
                <button className="w-11 h-11 rounded-xl bg-sage/10 text-forest flex items-center justify-center hover:bg-forest hover:text-white transition-all shadow-sm" title="Reorder Items">
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button className="w-11 h-11 rounded-xl border border-sage/10 text-charcoal/30 flex items-center justify-center hover:border-forest hover:text-forest transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-10 rounded-[3rem] bg-charcoal text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-forest/20 rounded-full blur-3xl -mr-32 -mt-32" />
        <h3 className="text-2xl font-display font-bold mb-4 relative z-10">Missing something?</h3>
        <p className="text-white/50 mb-8 relative z-10">If an order is missing or you need help with a delivery, our team is here to help.</p>
        <Link href="/contact" className="btn-primary inline-flex bg-white text-forest hover:bg-cream border-none px-12 relative z-10">
          Contact Support
        </Link>
      </div>
    </div>
  );
}
