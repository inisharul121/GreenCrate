import type { Metadata } from "next";
import { FruitsPageClient } from "./FruitsPageClient";
import { fruits } from "@/lib/products";

export const metadata: Metadata = {
  title: "Fruit Boxes",
  description: "Fresh seasonal fruit boxes for your workplace. Subscribe weekly, bi-weekly, or monthly and save up to 15%. Organic, local, delicious.",
};

export default function FruitsPage() {
  return <FruitsPageClient products={fruits} />;
}
