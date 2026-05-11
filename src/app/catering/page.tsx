import type { Metadata } from "next";
import { CateringPageClient } from "./CateringPageClient";
import { api } from "@/lib/api";

export const metadata: Metadata = {
  title: "Meeting Catering",
  description: "Fresh pastries, grain bowls, platters, and drinks for your workplace meetings. Same-day delivery available.",
};

export default async function CateringPage() {
  const cateringItems = await api.products.getByCategory("catering").catch(() => []);
  return <CateringPageClient products={cateringItems} />;
}
