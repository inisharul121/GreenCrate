import { notFound } from "next/navigation";
import { ProductDetailClient } from "./ProductDetailClient";
import { api } from "@/lib/api";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await api.products.getById(params.id).catch(() => null);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
