"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Save,
  Camera
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserSettingsPage() {
  const [form, setForm] = useState({
    fullName: "Nina Chowdhury",
    email: "nina@company.com.bd",
    company: "Grameenphone Ltd",
    phone: "+880 1700 000000",
    title: "Operations Manager",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("dashboard-settings");
    if (raw) {
      try {
        setForm(JSON.parse(raw));
      } catch {
        // ignore invalid cached values
      }
    }
  }, []);

  function handleSave(e: FormEvent) {
    e.preventDefault();
    localStorage.setItem("dashboard-settings", JSON.stringify(form));
    setMessage("Settings saved.");
    setTimeout(() => setMessage(""), 2500);
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-display font-bold text-charcoal">Account Settings</h2>
        <p className="text-charcoal/40 font-medium italic">Update your personal info and notification preferences.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left: Nav */}
        <div className="lg:col-span-1 space-y-2">
          <SettingsTab icon={User} label="Profile Info" active />
          <SettingsTab icon={Bell} label="Notifications" />
          <SettingsTab icon={Lock} label="Security" />
          <SettingsTab icon={Globe} label="Region & Language" />
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleSave} className="bg-white rounded-[3rem] p-10 shadow-premium border border-sage/5">
            <div className="flex items-center gap-6 mb-10 pb-10 border-b border-sage/5">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-forest/5 flex items-center justify-center text-forest text-2xl font-bold border-2 border-dashed border-forest/20">
                  NC
                </div>
                <button
                  type="button"
                  onClick={() => setMessage("Photo upload will be enabled with auth integration.")}
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-charcoal">{form.fullName}</h3>
                <p className="text-sm text-charcoal/40">{form.email}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Input label="Full Name" value={form.fullName} onChange={(value) => setForm((p) => ({ ...p, fullName: value }))} />
              <Input label="Work Email" value={form.email} onChange={(value) => setForm((p) => ({ ...p, email: value }))} />
              <div className="sm:col-span-2">
                <Input label="Company" value={form.company} onChange={(value) => setForm((p) => ({ ...p, company: value }))} />
              </div>
              <Input label="Phone Number" value={form.phone} onChange={(value) => setForm((p) => ({ ...p, phone: value }))} />
              <Input label="Job Title" value={form.title} onChange={(value) => setForm((p) => ({ ...p, title: value }))} />
            </div>

            <div className="mt-10 pt-10 border-t border-sage/5 flex justify-end">
              <button type="submit" className="btn-primary py-4 px-10 shadow-xl shadow-forest/10">
                <Save className="w-5 h-5" /> Save Changes
              </button>
            </div>
            {message ? <p className="mt-4 text-sm text-forest font-semibold text-right">{message}</p> : null}
          </form>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ icon: Icon, label, active }: any) {
  return (
    <button className={cn(
      "w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all",
      active ? "bg-forest text-white shadow-lg shadow-forest/10" : "text-charcoal/40 hover:bg-forest/5 hover:text-forest"
    )}>
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}

function Input({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-xs font-bold text-charcoal/30 uppercase tracking-widest mb-2 ml-1">{label}</label>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-6 py-4 rounded-2xl bg-cream border-2 border-sage/5 text-charcoal font-medium focus:outline-none focus:border-forest/30 transition-all"
      />
    </div>
  );
}
