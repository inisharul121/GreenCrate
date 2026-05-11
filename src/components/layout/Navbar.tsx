"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Leaf, User as UserIcon, LayoutDashboard, ShieldCheck, LogOut } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Fruit Boxes",      href: "/fruits" },
  { label: "Catering",         href: "/catering" },
  { label: "Free Test Box",    href: "/test-order" },
  { label: "About",            href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobile]   = useState(false);
  const { toggleCart, totalItems } = useCartStore();
  const count = totalItems();

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 16;
      setScrolled((prev) => {
        if (prev === isScrolled) return prev;
        return isScrolled;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile on route change
  useEffect(() => { setMobile(false); }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled || !isHome
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-sage/10"
            : "bg-transparent"
        )}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="GreenCrate home">
            <span
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-xl transition-colors",
                scrolled || !isHome ? "bg-forest" : "bg-white/20"
              )}
            >
              <Leaf className={cn("w-4 h-4", scrolled || !isHome ? "text-white" : "text-white")} />
            </span>
            <span
              className={cn(
                "font-display font-bold text-xl tracking-tight transition-colors",
                scrolled || !isHome ? "text-charcoal" : "text-white"
              )}
            >
              Green<span className={scrolled || !isHome ? "text-forest" : "text-sage-light"}>Crate</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-150",
                    pathname === link.href
                      ? scrolled || !isHome
                        ? "bg-forest/10 text-forest"
                        : "bg-white/20 text-white"
                      : scrolled || !isHome
                      ? "text-charcoal/70 hover:text-forest hover:bg-forest/8"
                      : "text-white/80 hover:text-white hover:bg-white/15"
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={toggleCart}
              aria-label={`Open cart, ${count} items`}
              className={cn(
                "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-150",
                scrolled || !isHome
                  ? "text-charcoal hover:bg-forest/8 hover:text-forest"
                  : "text-white hover:bg-white/15"
              )}
            >
              <ShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-amber text-charcoal text-[10px] font-bold flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </button>

            {/* CTA — desktop only */}
            <Link
              href="/fruits"
              className={cn(
                "hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ml-1",
                scrolled || !isHome
                  ? "bg-forest text-white hover:bg-forest-light shadow-md hover:shadow-lg"
                  : "bg-white text-forest hover:bg-cream shadow-md hover:shadow-lg"
              )}
            >
              Order Now
            </Link>

            {/* Account Dropdown */}
            <div className="relative group hidden sm:block">
              <button
                aria-label="Account"
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-150",
                  scrolled || !isHome
                    ? "text-charcoal hover:bg-forest/8 hover:text-forest"
                    : "text-white hover:bg-white/15"
                )}
              >
                <motion.div
                  whileHover={{ rotate: 5 }}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <UserIcon className="w-5 h-5" />
                </motion.div>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-1 w-56 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-white rounded-3xl shadow-2xl border border-sage/10 p-3 overflow-hidden">
                  <div className="px-4 py-3 border-b border-sage/5 mb-2">
                    <p className="text-xs font-bold text-charcoal/30 uppercase tracking-widest">Signed in as</p>
                    <p className="text-sm font-bold text-charcoal truncate">Nina Chowdhury</p>
                  </div>
                  <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-charcoal/70 hover:bg-forest/5 hover:text-forest transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> User Dashboard
                  </Link>
                  <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-charcoal/70 hover:bg-forest/5 hover:text-forest transition-colors">
                    <ShieldCheck className="w-4 h-4" /> Admin Dashboard
                  </Link>
                  <div className="h-px bg-sage/5 my-2" />
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 rounded-2xl text-sm font-medium text-rose-500 hover:bg-rose-50 transition-colors">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobile((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className={cn(
                "md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all",
                scrolled || !isHome
                  ? "text-charcoal hover:bg-forest/8"
                  : "text-white hover:bg-white/15"
              )}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-charcoal/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobile(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white shadow-2xl md:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-sage/10">
                <span className="font-display font-bold text-lg text-charcoal">
                  Green<span className="text-forest">Crate</span>
                </span>
                <button
                  onClick={() => setMobile(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-cream-dark text-charcoal/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <ul className="flex-1 py-6 px-4 space-y-1" role="list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-2xl text-base font-medium transition-all",
                        pathname === link.href
                          ? "bg-forest/10 text-forest"
                          : "text-charcoal/70 hover:text-forest hover:bg-forest/6"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <div className="p-6 border-t border-sage/10">
                <Link href="/fruits" className="btn-primary w-full justify-center">
                  Start Your Order
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
