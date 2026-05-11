import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GreenCrate handles personal data.",
};

export default function PrivacyPage() {
  return (
    <section className="pt-28 pb-16 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-bold text-charcoal mb-6">Privacy Policy</h1>
        <div className="bg-white rounded-3xl p-8 border border-sage/10 space-y-4 text-charcoal/70">
          <p>We only collect information needed to deliver orders, manage subscriptions, and support your account.</p>
          <p>We do not sell user data. Payment data is handled through secure payment partners.</p>
          <p>For data requests, contact hello@greencrate.com.bd.</p>
        </div>
      </div>
    </section>
  );
}
