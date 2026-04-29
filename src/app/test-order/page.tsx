import type { Metadata } from "next";
import { TestOrderClient } from "./TestOrderClient";

export const metadata: Metadata = {
  title: "Free Test Order | GreenCrate",
  description: "Try GreenCrate for free. Experience our premium fruit box delivery with no commitment.",
};

export default function TestOrderPage() {
  return <TestOrderClient />;
}
