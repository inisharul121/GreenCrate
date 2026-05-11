import type { Metadata } from "next";
import { FruitsPageClient } from "./FruitsPageClient";
import { api } from "@/lib/api";

export const metadata: Metadata = {
  title: "Fruit Boxes",
  description: "Fresh seasonal fruit boxes for your workplace. Subscribe weekly, bi-weekly, or monthly and save up to 15%. Organic, local, delicious.",
};

export default async function FruitsPage() {
  const fruits = await api.products.getByCategory("fruits").catch(() => []);
  return <FruitsPageClient products={fruits} />;
}
