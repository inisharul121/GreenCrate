"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { checkDeliveryZone } from "@/lib/delivery-zones";
import type { DeliveryZone } from "@/types";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "found" | "unavailable" | "unknown";

export function ZipChecker({ className }: { className?: string }) {
  const [zip, setZip]     = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [zone, setZone]   = useState<DeliveryZone | null>(null);

  const handleCheck = async () => {
    if (zip.length < 4) return;
    setStatus("loading");
    const result = await checkDeliveryZone(zip);
    if (!result) {
      setStatus("unknown");
      setZone(null);
    } else if (result.available) {
      setStatus("found");
      setZone(result);
    } else {
      setStatus("unavailable");
      setZone(result);
    }
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
          <input
            type="text"
            value={zip}
            onChange={(e) => { setZip(e.target.value.replace(/\D/g, "").slice(0, 5)); setStatus("idle"); }}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="Enter your ZIP code"
            maxLength={5}
            aria-label="ZIP code for delivery check"
            className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-sage/20 bg-white text-charcoal placeholder:text-charcoal/35 text-sm font-medium focus:outline-none focus:border-forest/60 focus:ring-2 focus:ring-forest/10 transition-all"
          />
        </div>
        <button
          onClick={handleCheck}
          disabled={zip.length < 4 || status === "loading"}
          aria-label="Check delivery availability"
          className={cn(
            "shrink-0 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-150",
            zip.length >= 4 && status !== "loading"
              ? "bg-forest text-white hover:bg-forest-light shadow-md hover:shadow-lg"
              : "bg-charcoal/10 text-charcoal/40 cursor-not-allowed"
          )}
        >
          {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Check"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {status === "found" && zone && (
          <motion.div key="found" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-start gap-2.5 px-4 py-3 rounded-2xl bg-sage/10 border border-sage/20">
            <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-forest">We deliver to {zone.city}! 🎉</p>
              <p className="text-xs text-charcoal/60 mt-0.5">Next delivery: {zone.nextDelivery} · Order by {zone.cutoffTime}</p>
            </div>
          </motion.div>
        )}
        {status === "unavailable" && zone && (
          <motion.div key="unavailable" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-start gap-2.5 px-4 py-3 rounded-2xl bg-amber/10 border border-amber/20">
            <XCircle className="w-4 h-4 text-amber shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-charcoal">{zone.city} is not yet covered</p>
              <p className="text-xs text-charcoal/60 mt-0.5">Leave your email and we&apos;ll notify you when we expand!</p>
            </div>
          </motion.div>
        )}
        {status === "unknown" && (
          <motion.div key="unknown" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-start gap-2.5 px-4 py-3 rounded-2xl bg-cream-dark border border-sage/15">
            <XCircle className="w-4 h-4 text-charcoal/40 shrink-0 mt-0.5" />
            <p className="text-sm text-charcoal/60">ZIP code not found. Please double-check and try again.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
