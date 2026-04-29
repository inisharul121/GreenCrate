// ─── Product & Catalog ────────────────────────────────────────────────────────

export type ProductCategory = "fruits" | "catering" | "gifts";
export type SubscriptionFrequency = "weekly" | "biweekly" | "monthly";
export type PurchaseType = "test" | "subscription" | "onetime";
export type DietaryTag = "vegan" | "vegetarian" | "gluten-free" | "organic" | "dairy-free";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // one-time price in BDT
  subscriptionPrices: Record<SubscriptionFrequency, number>;
  category: ProductCategory;
  subcategory?: string;
  image: string;
  badges: string[];
  dietaryTags: DietaryTag[];
  seasonal: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  minQuantity?: number;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
  purchaseType: PurchaseType;
  frequency?: SubscriptionFrequency;
}

// ─── Delivery ─────────────────────────────────────────────────────────────────

export interface DeliveryZone {
  zip: string;
  city: string;
  available: boolean;
  nextDelivery?: string;
  cutoffTime?: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}
