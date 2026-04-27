import type { Metadata } from "next";
import { GiftsPageClient } from "./GiftsPageClient";
import { giftItems } from "@/lib/products";

export const metadata: Metadata = {
  title: "Corporate Gifts",
  description: "Beautifully curated corporate gift boxes with your branding. Perfect for clients, partners, and employee appreciation.",
};

export default function GiftsPage() {
  return <GiftsPageClient products={giftItems} />;
}
