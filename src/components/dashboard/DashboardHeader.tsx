"use client";

import { Bell, Search, User } from "lucide-react";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  
  // Format title from pathname
  const getTitle = () => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    if (parts.length > 1) return parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
    return "Dashboard";
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-sage/10 sticky top-0 z-40 px-8 flex items-center justify-between">
      <h1 className="text-xl font-display font-bold text-charcoal">
        {getTitle()}
      </h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/5 border border-sage/10 w-64 group focus-within:border-forest/30 transition-all">
          <Search className="w-4 h-4 text-charcoal/30 group-focus-within:text-forest transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none text-sm outline-none w-full text-charcoal placeholder:text-charcoal/30" 
          />
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-forest/5 text-charcoal/60 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-white" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-sage/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-charcoal leading-none">Nina Chowdhury</p>
            <p className="text-[10px] font-medium text-forest uppercase tracking-wider mt-1">Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-sage-gradient flex items-center justify-center text-white shadow-md border-2 border-white">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
