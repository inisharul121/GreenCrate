import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "GreenCrate updates, food tips, and workplace wellness insights.",
};

const posts = [
  {
    slug: "workplace-fruit-benefits",
    title: "Why fresh fruit boosts workplace productivity",
    excerpt: "A practical look at nutrition and team energy during long office days.",
    date: "May 2026",
  },
  {
    slug: "zero-waste-delivery",
    title: "How we run zero-waste delivery operations",
    excerpt: "Inside our reusable crates, route optimization, and local sourcing model.",
    date: "Apr 2026",
  },
  {
    slug: "seasonal-office-menu",
    title: "Building a seasonal office food plan",
    excerpt: "Tips for rotating fruit and catering plans throughout the year.",
    date: "Mar 2026",
  },
];

export default function BlogPage() {
  return (
    <section className="pt-28 pb-16 bg-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-bold text-charcoal mb-3">GreenCrate Blog</h1>
        <p className="text-charcoal/60 mb-10">Ideas and updates from our team.</p>
        <div className="grid gap-5">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-3xl p-6 border border-sage/10">
              <p className="text-xs uppercase tracking-widest text-charcoal/40 mb-2">{post.date}</p>
              <h2 className="font-display text-2xl font-bold text-charcoal mb-2">{post.title}</h2>
              <p className="text-charcoal/60 mb-4">{post.excerpt}</p>
              <Link href="/contact" className="text-forest font-bold text-sm hover:underline">
                Request full article
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
