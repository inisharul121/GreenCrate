"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SubscriptionFrequency } from "@/types";

interface Option {
  value: SubscriptionFrequency;
  label: string;
  discount: string;
}

const OPTIONS: Option[] = [
  { value: "weekly",   label: "Weekly",    discount: "Save 15%" },
  { value: "biweekly", label: "Bi-weekly", discount: "Save 10%" },
  { value: "monthly",  label: "Monthly",   discount: "Save 6%"  },
];

interface Props {
  value: SubscriptionFrequency;
  onChange: (v: SubscriptionFrequency) => void;
  showOneTime?: boolean;
  isSubscription: boolean;
  onSubscriptionChange: (v: boolean) => void;
  className?: string;
}

export function SubscriptionToggle({ value, onChange, showOneTime = true, isSubscription, onSubscriptionChange, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* One-time vs Subscribe switch */}
      {showOneTime && (
        <div className="flex items-center gap-1 p-1 bg-cream-dark rounded-2xl self-start">
          {[false, true].map((sub) => (
            <button
              key={String(sub)}
              onClick={() => onSubscriptionChange(sub)}
              aria-pressed={isSubscription === sub}
              className={cn(
                "px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200",
                isSubscription === sub
                  ? "bg-forest text-white shadow-sm"
                  : "text-charcoal/60 hover:text-charcoal"
              )}
            >
              {sub ? "Subscribe & Save" : "One-time"}
            </button>
          ))}
        </div>
      )}

      {/* Frequency selector */}
      {isSubscription && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 flex-wrap"
        >
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              aria-pressed={value === opt.value}
              className={cn(
                "flex flex-col items-center px-4 py-2 rounded-2xl border-2 text-sm transition-all duration-150",
                value === opt.value
                  ? "border-forest bg-forest/8 text-forest"
                  : "border-sage/20 text-charcoal/60 hover:border-sage/50 hover:text-charcoal"
              )}
            >
              <span className="font-semibold">{opt.label}</span>
              <span className={cn("text-[11px] font-medium", value === opt.value ? "text-sage" : "text-charcoal/40")}>
                {opt.discount}
              </span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
