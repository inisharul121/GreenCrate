import type { Metadata } from "next";
import { CateringPageClient } from "./CateringPageClient";
import { cateringItems } from "@/lib/products";

export const metadata: Metadata = {
  title: "Meeting Catering",
  description: "Fresh pastries, grain bowls, platters, and drinks for your workplace meetings. Same-day delivery available.",
};

export default function CateringPage() {
  return <CateringPageClient products={cateringItems} />;
}
