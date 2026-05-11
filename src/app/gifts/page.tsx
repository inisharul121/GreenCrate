import type { Metadata } from "next";
import { GiftsPageClient } from "./GiftsPageClient";
import { api } from "@/lib/api";

export const metadata: Metadata = {
  title: "Corporate Gifts",
  description: "Beautifully curated corporate gift boxes with your branding. Perfect for clients, partners, and employee appreciation.",
};

export default async function GiftsPage() {
  const giftItems = await api.products.getByCategory("gifts").catch(() => []);
  return <GiftsPageClient products={giftItems} />;
}
