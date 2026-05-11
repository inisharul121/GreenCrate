"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Leaf, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";

const LINKS = {
  products: [
    { label: "Fruit Boxes",     href: "/fruits" },
    { label: "Catering",        href: "/catering" },
    { label: "Corporate Gifts", href: "/gifts" },
  ],
  company: [
    { label: "About Us",   href: "/about" },
    { label: "Contact",    href: "/contact" },
    { label: "Blog",       href: "/blog" },
    { label: "Careers",    href: "/careers" },
  ],
  legal: [
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy",    href: "/cookies" },
  ],
};

const SOCIAL = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/" },
  { icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/" },
  { icon: Twitter,   label: "Twitter",   href: "https://twitter.com/" },
];

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  function handleNewsletterSubmit(e: FormEvent) {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    window.location.href = `mailto:hello@greencrate.com.bd?subject=Newsletter%20Signup&body=Please%20add%20${encodeURIComponent(newsletterEmail)}%20to%20the%20newsletter.`;
    setNewsletterEmail("");
  }

  return (
    <footer className="bg-charcoal text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-forest">
                <Leaf className="w-4 h-4 text-white" />
              </span>
              <span className="font-display font-bold text-xl">
                Green<span className="text-sage">Crate</span>
              </span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs mb-6">
              Fresh, sustainable workplace food delivered before your team arrives. Proudly sourcing from local Bangladeshi farms.
            </p>
            <ul className="space-y-2 text-sm text-white/50">
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-sage shrink-0" />Gulshan 1, Dhaka 1212, Bangladesh</li>
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-sage shrink-0" />+880 1700 000000</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-sage shrink-0" />hello@greencrate.com.bd</li>
            </ul>
            <div className="flex gap-3 mt-6">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="w-9 h-9 rounded-full bg-white/8 hover:bg-sage/25 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-white/70" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-2.5">
              {LINKS.products.map((l) => (
                <li key={`${l.label}-${l.href}`}><Link href={l.href} className="text-sm text-white/50 hover:text-sage transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5">
              {LINKS.company.map((l) => (
                <li key={`${l.label}-${l.href}`}><Link href={l.href} className="text-sm text-white/50 hover:text-sage transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">Stay Fresh</h3>
            <p className="text-sm text-white/50 mb-4">Get seasonal picks &amp; workplace food ideas.</p>
            <form className="flex flex-col gap-2" onSubmit={handleNewsletterSubmit}>
              <input type="email" placeholder="your@company.com" aria-label="Email for newsletter"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/8 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-sage/50 transition" />
              <button type="submit" className="w-full py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white text-sm font-semibold transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <p>© {new Date().getFullYear()} GreenCrate Ltd. All rights reserved.</p>
          <ul className="flex items-center gap-4">
            {LINKS.legal.map((l) => (
              <li key={l.label}><Link href={l.href} className="hover:text-white/60 transition-colors">{l.label}</Link></li>
            ))}
          </ul>
          <p className="flex items-center gap-1"><Leaf className="w-3 h-3 text-sage" /> Carbon-neutral delivery</p>
        </div>
      </div>
    </footer>
  );
}
