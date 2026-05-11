import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at GreenCrate.",
};

const roles = [
  "Operations Coordinator",
  "Partnerships Manager",
  "Customer Success Executive",
];

export default function CareersPage() {
  return (
    <section className="pt-28 pb-16 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-bold text-charcoal mb-3">Careers</h1>
        <p className="text-charcoal/60 mb-10">
          Join us to build a healthier workplace food experience across Bangladesh.
        </p>
        <div className="grid gap-4">
          {roles.map((role) => (
            <div key={role} className="bg-white rounded-2xl p-5 border border-sage/10 flex items-center justify-between">
              <p className="font-bold text-charcoal">{role}</p>
              <a
                href={`mailto:hello@greencrate.com.bd?subject=Application%20for%20${encodeURIComponent(role)}`}
                className="text-sm font-bold text-forest hover:underline"
              >
                Apply
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
