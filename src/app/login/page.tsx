"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LogIn, 
  Mail, 
  Lock, 
  ArrowRight,
  ShieldCheck,
  Leaf,
  Globe
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Authenticate instantly
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FDFCF9] flex items-center justify-center p-6 pt-32 pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-forest/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-sage/5 rounded-full blur-[80px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-forest rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-forest/20 rotate-3">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-charcoal mb-2">Welcome Back</h1>
          <p className="text-charcoal/40 font-medium italic">Sign in to manage your office deliveries.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-premium border border-sage/5">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-charcoal/30 uppercase tracking-widest mb-2 ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/20 group-focus-within:text-forest transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="nina@company.com.bd"
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-cream border-2 border-sage/5 text-charcoal font-medium focus:outline-none focus:border-forest/30 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-xs font-bold text-charcoal/30 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-[10px] font-bold text-forest uppercase tracking-widest hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/20 group-focus-within:text-forest transition-colors" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-cream border-2 border-sage/5 text-charcoal font-medium focus:outline-none focus:border-forest/30 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-5 shadow-lg shadow-forest/10 mt-2"
            >
              {loading ? "Authenticating..." : <><LogIn className="w-5 h-5" /> Sign In to Dashboard</>}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-sage/5">
            <p className="text-center text-sm text-charcoal/40">
              Don&apos;t have an account?{" "}
              <Link href="/test-order" className="text-forest font-bold hover:underline">
                Start with a Free Trial
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-charcoal/30">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Secure Auth</span>
          </div>
          <div className="flex items-center gap-3 text-charcoal/30 justify-end">
            <Globe className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">BD Enterprise</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
