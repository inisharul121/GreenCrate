"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Leaf, 
  Package, 
  Calendar, 
  CreditCard,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  href: string;
  icon: any;
}

interface DashboardSidebarProps {
  isAdmin?: boolean;
}

const ADMIN_ITEMS: SidebarItem[] = [
  { label: "Overview",   href: "/admin",          icon: LayoutDashboard },
  { label: "Products",   href: "/admin/products",   icon: Package },
  { label: "Orders",     href: "/admin/orders",     icon: ShoppingBag },
  { label: "Customers",  href: "/admin/customers",  icon: Users },
  { label: "Settings",   href: "/admin/settings",   icon: Settings },
];

const USER_ITEMS: SidebarItem[] = [
  { label: "My Account",   href: "/dashboard",               icon: LayoutDashboard },
  { label: "My Orders",    href: "/dashboard/orders",        icon: ShoppingBag },
  { label: "Subscriptions", href: "/dashboard/subscriptions", icon: Calendar },
  { label: "Payment",      href: "/dashboard/payment",       icon: CreditCard },
  { label: "Settings",     href: "/dashboard/settings",      icon: Settings },
];

export function DashboardSidebar({ isAdmin = false }: DashboardSidebarProps) {
  const pathname = usePathname();
  const items = isAdmin ? ADMIN_ITEMS : USER_ITEMS;

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-sage/10 flex flex-col z-50">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-sage/10">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-forest">
            <Leaf className="w-3.5 h-3.5 text-white" />
          </span>
          <span className="font-display font-bold text-lg text-charcoal tracking-tight">
            Green<span className="text-forest">Crate</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-4 space-y-1">
        <div className="px-3 mb-2 text-[10px] font-bold text-charcoal/30 uppercase tracking-[0.2em]">
          {isAdmin ? "Admin Management" : "Account Menu"}
        </div>
        
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative overflow-hidden",
                isActive 
                  ? "text-forest bg-forest/8" 
                  : "text-charcoal/60 hover:text-forest hover:bg-forest/5"
              )}
            >
              <item.icon className={cn("w-4.5 h-4.5 shrink-0", isActive ? "text-forest" : "text-charcoal/40 group-hover:text-forest")} />
              {item.label}
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute right-0 top-2 bottom-2 w-1 bg-forest rounded-l-full"
                />
              )}
              {!isActive && (
                <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0 transition-all" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sage/10">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 w-full transition-colors group">
          <LogOut className="w-4.5 h-4.5 shrink-0 group-hover:scale-110 transition-transform" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
