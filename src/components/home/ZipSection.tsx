import { MapPin } from "lucide-react";
import { ZipChecker } from "@/components/ui/ZipChecker";

export function ZipSection() {
  return (
    <section className="py-20 bg-cream" aria-label="Delivery zone checker">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-forest/10 flex items-center justify-center mx-auto mb-5">
          <MapPin className="w-6 h-6 text-forest" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mb-3">
          Do we deliver to you?
        </h2>
        <p className="text-charcoal/55 mb-8">
          Enter your workplace ZIP code to check availability and your next delivery window.
        </p>
        <ZipChecker />
      </div>
    </section>
  );
}
