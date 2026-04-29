"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: any;
  color: "forest" | "amber" | "sage" | "rose";
}

const COLORS = {
  forest: "bg-forest/10 text-forest",
  amber: "bg-amber/10 text-amber",
  sage: "bg-sage/10 text-sage",
  rose: "bg-rose-500/10 text-rose-500",
};

export function StatCard({ label, value, change, trend, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-premium border border-sage/5">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", COLORS[color])}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold",
          trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-charcoal/40 mb-1">{label}</p>
        <h3 className="text-2xl font-display font-bold text-charcoal">{value}</h3>
      </div>
    </div>
  );
}
