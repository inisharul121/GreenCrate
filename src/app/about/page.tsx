import type { Metadata } from "next";
import { Leaf, Heart, Recycle, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "GreenCrate's story — our mission, sustainability values, and the team behind your workplace's freshest deliveries.",
};

const STATS = [
  { value: "500+", label: "Happy companies" },
  { value: "8 AM", label: "Guaranteed delivery" },
  { value: "0",    label: "Plastic packaging" },
  { value: "100%", label: "Carbon neutral" },
];

const VALUES = [
  { icon: Leaf,    title: "Local sourcing first",   desc: "We partner with 40+ local Bangladeshi farms, keeping food miles low and quality high." },
  { icon: Recycle, title: "Zero-waste packaging",   desc: "All packaging is compostable, recyclable, or reusable. Zero single-use plastic — ever." },
  { icon: Heart,   title: "People over profit",     desc: "Fair wages for farmers, living wages for drivers, and a culture of care at every level." },
  { icon: Users,   title: "Community-driven",       desc: "10% of profits go back to urban farming initiatives across Bangladesh." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sage-light text-sm font-semibold uppercase tracking-widest mb-3">Our story</p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
            We believe workplaces<br />deserve better food
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Founded in 2020 in Zürich, GreenCrate started with a simple idea: everyone deserves access to fresh, quality food at work — not vending machine snacks.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white border-b border-sage/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="font-display text-4xl font-bold text-forest mb-1">{value}</p>
              <p className="text-sm text-charcoal/55">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-sm font-semibold text-sage uppercase tracking-widest mb-3">How it started</p>
            <h2 className="font-display text-4xl font-bold text-charcoal mb-5">From a bootstrapped idea to 500+ offices</h2>
            <div className="space-y-4 text-charcoal/65 leading-relaxed">
              <p>GreenCrate began when our founder, Nina Chowdhury, noticed that the office fruit basket at her Dhaka startup was always sad, overripe, and wasteful. She called a local farm, made a deal, and delivered 10 boxes by bicycle that first week.</p>
              <p>Word spread quickly. Within six months, she had 50 clients and a small team. Today we deliver to 500+ companies across Bangladesh, with a fleet of electric vans and a network of 40+ farm partners.</p>
              <p>Our mission has never changed: fresh, sustainable, beautiful workplace food — delivered with a smile before your team arrives.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(["#2D6A4F","#52B788","#40916C","#1B4332"] as const).map((color, i) => (
              <div key={i} className="aspect-square rounded-3xl flex items-center justify-center text-5xl"
                style={{ backgroundColor: color + "22", border: `2px solid ${color}33` }}>
                {["🚴","🌿","🍎","🤝"][i]}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-sage uppercase tracking-widest mb-2">What we stand for</p>
            <h2 className="font-display text-4xl font-bold text-charcoal">Our values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-3xl bg-cream hover:bg-cream-dark transition-colors">
                <div className="w-11 h-11 rounded-2xl bg-forest/10 flex items-center justify-center text-forest mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-charcoal text-lg mb-2">{title}</h3>
                <p className="text-sm text-charcoal/55 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold text-charcoal mb-10">The team</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name:"Nina Keller",     role:"Co-founder & CEO",       initial:"NK", color:"#2D6A4F" },
              { name:"Marc Zimmermann", role:"Head of Logistics",      initial:"MZ", color:"#52B788" },
              { name:"Sarah Hofmann",   role:"Head of Partnerships",   initial:"SH", color:"#40916C" },
            ].map(({ name, role, initial, color }) => (
              <div key={name} className="bg-white rounded-3xl p-8 text-center shadow-card">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
                  style={{ backgroundColor: color }}>
                  {initial}
                </div>
                <p className="font-display font-semibold text-charcoal text-lg">{name}</p>
                <p className="text-sm text-charcoal/50 mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
