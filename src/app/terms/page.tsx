import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using GreenCrate.",
};

export default function TermsPage() {
  return (
    <section className="pt-28 pb-16 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-bold text-charcoal mb-6">Terms of Service</h1>
        <div className="bg-white rounded-3xl p-8 border border-sage/10 space-y-4 text-charcoal/70">
          <p>By using GreenCrate, you agree to provide accurate order details and maintain lawful usage of the platform.</p>
          <p>Delivery windows and availability depend on location and operational capacity.</p>
          <p>For account concerns, contact hello@greencrate.com.bd.</p>
        </div>
      </div>
    </section>
  );
}
