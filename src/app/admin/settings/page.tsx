"use client";

import { motion } from "framer-motion";
import { 
  Settings, 
  Globe, 
  ShieldCheck, 
  Bell, 
  Truck,
  CreditCard,
  Save,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-display font-bold text-charcoal">Platform Settings</h2>
        <p className="text-charcoal/40 font-medium italic">Configure global parameters, delivery zones, and business logic.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-2">
          <SettingsTab icon={Globe} label="Market & Regions" active />
          <SettingsTab icon={Truck} label="Delivery Logistics" />
          <SettingsTab icon={CreditCard} label="Billing & Payouts" />
          <SettingsTab icon={ShieldCheck} label="Access Control" />
          <SettingsTab icon={Bell} label="System Alerts" />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 shadow-premium border border-sage/5">
            <h3 className="text-xl font-display font-bold text-charcoal mb-8 border-b border-sage/5 pb-4">Market Configuration</h3>
            
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <Input label="Primary Market" value="Bangladesh" readOnly />
                <Input label="Currency" value="BDT (৳)" readOnly />
                <Input label="Tax Rate (%)" placeholder="15" />
                <Input label="Free Delivery Threshold" placeholder="5000" />
              </div>

              <div className="p-6 rounded-3xl bg-forest/5 border border-forest/10 flex items-center gap-4">
                <Zap className="w-8 h-8 text-forest shrink-0" />
                <div>
                  <p className="text-sm font-bold text-charcoal">Quick Switch</p>
                  <p className="text-xs text-charcoal/50 leading-relaxed">
                    Toggle entire platform availability or seasonal modes from here.
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="w-12 h-6 rounded-full bg-forest relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-sage/5 flex justify-end">
              <button className="btn-primary py-4 px-10 shadow-xl shadow-forest/10">
                <Save className="w-5 h-5" /> Save Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ icon: Icon, label, active }: any) {
  return (
    <button className={cn(
      "w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all",
      active ? "bg-charcoal text-white shadow-lg" : "text-charcoal/40 hover:bg-forest/5 hover:text-forest"
    )}>
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}

function Input({ label, placeholder, value, readOnly }: any) {
  return (
    <div>
      <label className="block text-xs font-bold text-charcoal/30 uppercase tracking-widest mb-2 ml-1">{label}</label>
      <input 
        type="text" 
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        className={cn(
          "w-full px-6 py-4 rounded-2xl border-2 text-charcoal font-medium transition-all",
          readOnly ? "bg-charcoal/5 border-transparent opacity-60 cursor-not-allowed" : "bg-cream border-sage/5 focus:outline-none focus:border-forest/30"
        )}
      />
    </div>
  );
}
