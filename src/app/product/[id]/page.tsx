import { notFound } from "next/navigation";
import { allProducts } from "@/lib/products";
import { ProductDetailClient } from "./ProductDetailClient";

export async function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = allProducts.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
