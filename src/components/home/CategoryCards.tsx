"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    title: "Fruit Boxes",
    subtitle: "Weekly & monthly subscriptions",
    desc: "Handpicked seasonal fruits from Swiss and regional farms. Fresh, organic, zero waste.",
    emoji: "🍎",
    href: "/fruits",
    gradient: "from-forest-dark via-forest to-sage",
    tags: ["Organic", "Seasonal", "Subscribe & Save"],
  },
  {
    title: "Meeting Catering",
    subtitle: "From pastries to power bowls",
    desc: "Elevate every meeting with fresh pastries, grain bowls, platters, and artisan drinks.",
    emoji: "🥐",
    href: "/catering",
    gradient: "from-charcoal via-charcoal-light to-forest",
    tags: ["Same-day delivery", "Min. 5 people", "Custom menus"],
  },
  {
    title: "Corporate Gifts",
    subtitle: "Branded, beautiful, memorable",
    desc: "Curated gift boxes with your branding — for clients, partners, and year-end celebrations.",
    emoji: "🎁",
    href: "/gifts",
    gradient: "from-amber-900 via-amber-800 to-amber",
    tags: ["Custom branding", "Bulk discounts", "Premium packaging"],
  },
];

export function CategoryCards() {
  return (
    <section className="py-24 bg-cream" aria-label="Product categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-sage uppercase tracking-widest mb-2">What we offer</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">
            Everything your workplace needs
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.href}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 180 }}
            >
              <Link href={cat.href} className="group relative flex flex-col overflow-hidden rounded-4xl h-[440px] cursor-pointer" aria-label={cat.title}>
                {/* Gradient bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} transition-all duration-500 group-hover:scale-105`} />

                {/* Noise texture */}
                <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"}} />

                {/* Glow blob */}
                <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl group-hover:scale-150 transition-transform duration-700" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full p-8">
                  {/* Emoji */}
                  <div className="text-6xl mb-auto animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                    {cat.emoji}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cat.tags.map((tag) => (
                      <span key={tag} className="badge-white text-[11px]">{tag}</span>
                    ))}
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-white/55 text-xs font-semibold uppercase tracking-wider mb-1">{cat.subtitle}</p>
                    <h3 className="font-display text-3xl font-bold text-white mb-2">{cat.title}</h3>
                    <p className="text-white/65 text-sm leading-relaxed mb-5">{cat.desc}</p>
                    <div className="flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-4 transition-all duration-200">
                      Explore <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
