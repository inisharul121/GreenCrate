"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden"
      aria-label="Hero"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-sage/20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-forest-light/30 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-sage/10 blur-[80px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/12 border border-white/20 text-white/90 text-sm font-medium mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber" />
              Trusted by 500+ Swiss companies
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
            >
              Fresh food,{" "}
              <span className="italic text-sage-light">happier</span>
              <br />teams.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/65 leading-relaxed max-w-md mb-10"
            >
              Premium fruit boxes, meeting catering, and corporate gifts delivered to your workplace — fresh every morning, before your team arrives.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/fruits"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-forest font-bold text-sm hover:bg-cream transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 duration-200"
              >
                Fruit Boxes <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/catering"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/12 border border-white/25 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
              >
                Meeting Catering
              </Link>
              <Link
                href="/gifts"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/12 border border-white/25 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
              >
                Corporate Gifts
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 mt-10"
            >
              <div className="flex -space-x-2">
                {["#74C69D","#52B788","#40916C","#2D6A4F","#1B4332"].map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {["ZF","HT","AV","SG","MR"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-amber text-amber" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/55 text-xs mt-0.5">4.9 · 1,200+ reviews</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Floating visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, type: "spring", stiffness: 100 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Main image container */}
            <div className="relative w-[500px] h-[500px]">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-white/8 animate-[spin_20s_linear_infinite_reverse]" />

              {/* Generated Hero Image */}
              <div className="absolute inset-4 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
                <img
                  src="/images/hero.png"
                  alt="Fresh GreenCrate fruit box delivery"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badges */}
              <FloatingBadge top="8%" left="75%" delay={0.8} emoji="🥑" label="Organic" />
              <FloatingBadge top="75%" left="85%" delay={1.0} emoji="🍋" label="Local farms" />
              <FloatingBadge top="85%" left="5%" delay={1.2} emoji="🫐" label="Seasonal" />
              <FloatingBadge top="2%" left="-12%" delay={0.9} emoji="⚡" label="Before 8 AM" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

function FloatingBadge({ top, left, delay, emoji, label }: { top: string; left: string; delay: number; emoji: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      style={{ top, left }}
      className="absolute flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shadow-glass"
    >
      <span className="text-lg">{emoji}</span>
      <span className="text-white/90 text-xs font-semibold whitespace-nowrap">{label}</span>
    </motion.div>
  );
}
