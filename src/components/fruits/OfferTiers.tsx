"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Calendar, Zap } from "lucide-react";
import type { PurchaseType, SubscriptionFrequency } from "@/types";
import { cn } from "@/lib/utils";

interface Tier {
  id: PurchaseType;
  title: string;
  subtitle: string;
  priceTag: string;
  benefits: string[];
  icon: any;
  highlight?: boolean;
}

const TIERS: Tier[] = [
  {
    id: "test",
    title: "Test Order",
    subtitle: "Experience the quality",
    priceTag: "Free of charge",
    benefits: ["One-time delivery", "Full-sized box", "No commitment", "Next day delivery"],
    icon: Zap,
  },
  {
    id: "subscription",
    title: "Fruit Subscription",
    subtitle: "Healthy habits, daily",
    priceTag: "Save 15%",
    benefits: ["Weekly or bi-weekly", "Cancel anytime", "Priority support", "Free delivery"],
    icon: Sparkles,
    highlight: true,
  },
  {
    id: "onetime",
    title: "One-time Order",
    subtitle: "Flexible and easy",
    priceTag: "Regular price",
    benefits: ["Perfect for events", "Choose any date", "No recurring billing", "Large variety"],
    icon: Calendar,
  },
];

interface Props {
  selected: PurchaseType;
  onSelect: (type: PurchaseType) => void;
}

export function OfferTiers({ selected, onSelect }: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 px-4">
      {TIERS.map((tier) => {
        const Icon = tier.icon;
        const isActive = selected === tier.id;

        return (
          <motion.div
            key={tier.id}
            whileHover={{ y: -5 }}
            onClick={() => onSelect(tier.id)}
            className={cn(
              "relative cursor-pointer rounded-[2.5rem] p-8 transition-all duration-300 border-2",
              isActive
                ? "bg-white border-forest shadow-2xl ring-4 ring-forest/5"
                : "bg-white/50 border-sage/10 hover:border-sage/30 shadow-sm"
            )}
          >
            {tier.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-forest text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                Most Popular
              </div>
            )}

            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
              isActive ? "bg-forest text-white" : "bg-sage/10 text-forest"
            )}>
              <Icon className="w-6 h-6" />
            </div>

            <h3 className="font-display text-2xl font-bold text-charcoal mb-1">{tier.title}</h3>
            <p className="text-charcoal/40 text-sm mb-6">{tier.subtitle}</p>
            
            <div className="text-forest font-bold text-lg mb-8">{tier.priceTag}</div>

            <ul className="space-y-4 mb-8">
              {tier.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-charcoal/70">
                  <div className="mt-1 shrink-0 w-4 h-4 rounded-full bg-forest/10 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-forest" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className={cn(
              "w-full py-3 rounded-full text-sm font-bold text-center transition-all",
              isActive 
                ? "bg-forest text-white shadow-md" 
                : "bg-cream text-charcoal/60 hover:bg-cream-dark"
            )}>
              {isActive ? "Selected" : "Select Plan"}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
