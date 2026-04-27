"use client";

import { motion } from "framer-motion";
import { Truck, Leaf, Clock, ShieldCheck } from "lucide-react";

const PROPS = [
  {
    icon: Clock,
    title: "Delivered by 8 AM",
    desc: "Fresh products arrive before your team — no one waits, everyone wins.",
    color: "bg-sage/12 text-forest",
  },
  {
    icon: Leaf,
    title: "100% Sustainable",
    desc: "Carbon-neutral logistics, plastic-free packaging, local sourcing first.",
    color: "bg-forest/10 text-forest-dark",
  },
  {
    icon: Truck,
    title: "Zero Hassle",
    desc: "One-click subscriptions, flexible schedules, easy cancellation anytime.",
    color: "bg-amber/12 text-amber-700",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    desc: "Freshness guarantee — if you're not happy, we'll make it right.",
    color: "bg-sage/10 text-forest",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 22 } },
};

export function ValueProps() {
  return (
    <section className="py-20 bg-white" aria-label="Why GreenCrate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-sage uppercase tracking-widest mb-2">Why teams love us</p>
          <h2 className="font-display text-4xl font-bold text-charcoal">
            Fresh food, <span className="gradient-text">done right</span>
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PROPS.map(({ icon: Icon, title, desc, color }) => (
            <motion.div
              key={title}
              variants={item}
              className="flex flex-col items-start p-6 rounded-3xl bg-cream hover:bg-cream-dark transition-colors duration-200 group"
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-charcoal text-lg mb-1.5 group-hover:text-forest transition-colors">{title}</h3>
              <p className="text-sm text-charcoal/55 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
