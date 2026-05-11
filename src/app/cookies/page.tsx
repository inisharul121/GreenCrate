import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie usage information for GreenCrate.",
};

export default function CookiePage() {
  return (
    <section className="pt-28 pb-16 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-bold text-charcoal mb-6">Cookie Policy</h1>
        <div className="bg-white rounded-3xl p-8 border border-sage/10 space-y-4 text-charcoal/70">
          <p>We use essential cookies for login/session behavior and optional analytics for product improvements.</p>
          <p>You can clear cookies anytime in your browser settings.</p>
        </div>
      </div>
    </section>
  );
}
