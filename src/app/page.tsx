import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { ValueProps } from "@/components/home/ValueProps";
import { CategoryCards } from "@/components/home/CategoryCards";
import { SubscriptionBanner } from "@/components/home/SubscriptionBanner";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Testimonials } from "@/components/home/Testimonials";
import { ZipSection } from "@/components/home/ZipSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { fruits, cateringItems } from "@/lib/products";

export const metadata: Metadata = {
  title: "GreenCrate — Fresh Workplace Food Delivery",
  description: "Premium fruit boxes, catering, and corporate gifts delivered fresh to your workplace every morning. Sustainable. Local. Delicious.",
};

export default function HomePage() {
  const featuredFruits    = fruits.slice(0, 3);
  const featuredCatering  = cateringItems.slice(0, 3);

  return (
    <>
      <HeroSection />
      <ValueProps />
      <CategoryCards />
      <FeaturedProducts fruits={featuredFruits} catering={featuredCatering} />
      <SubscriptionBanner />
      <Testimonials />
      <ZipSection />
      <CtaBanner />
    </>
  );
}
