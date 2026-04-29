# GreenCrate 🍏

GreenCrate is a premium workplace food delivery platform built with a "Natural Modern" aesthetic. The business logic and multi-tiered product offering structure are heavily inspired by [Earlybird.ch](https://earlybird.ch/), localized for the Bangladesh market.

---

## 🤖 Context for AI Assistants (GPT / Claude / Cursor)
If you are an AI assistant reading this file, you are jumping into a project with specific business logic and a highly tailored design system. Please adhere to the following rules and structures when writing code for this project.

### 1. Core Tech Stack
*   **Framework:** Next.js 14+ (App Router), localized for Bangladesh (BDT/৳)
*   **Styling:** Tailwind CSS (Vanilla CSS in `globals.css` for custom utilities)
*   **Animations:** `framer-motion` (used extensively for premium micro-interactions)
*   **State Management:** `zustand` (specifically for the Cart)
*   **Icons:** `lucide-react`

### 2. Business Logic: The Three Tiers
Products are not just added to the cart; they carry a specific `PurchaseType` (`test`, `subscription`, `onetime`). This is the core functionality copied from Earlybird.
*   **Free Test Box (`test`)**: A loss-leader to acquire B2B customers. The cart logic (`src/store/cart.ts`) strictly forces the price of any item with this type to `BDT 0.00`.
*   **Subscription (`subscription`)**: Recurring deliveries (weekly, bi-weekly, monthly). Products have a `subscriptionPrices` map in `src/lib/products.ts` which usually reflects a 15% discount.
*   **One-Time (`onetime`)**: Standard full-price purchases.

*If you are modifying the checkout flow or adding products, you MUST respect this three-tier system and the `PurchaseType` typescript definitions in `src/types/index.ts`.*

### 3. Key Pages & Components
*   **Hero Section (`src/components/home/HeroSection.tsx`)**: Features a highly custom layout with a large, rotating transparent apple (`public/images/apple.png`), animated floating badges, and complex background blobs using gradients. Do not overwrite the animations here unless explicitly asked.
*   **Test Order Landing Page (`src/app/test-order/page.tsx`)**: A dedicated funnel for the "Free Test Box".
*   **Offer Tiers Component**: Found on product pages to let users select their `PurchaseType` before adding to cart.

### 4. Design System ("Natural Modern")
This project avoids "generic" Tailwind layouts. It relies on a premium, natural look.
*   **Colors**:
    *   `forest`: `#2D6A4F` (Dark, rich green used for primary buttons and text)
    *   `sage`: `#52B788` (Lighter green used for accents and backgrounds)
    *   `cream`: `#F9F5F0` (Off-white used for the main body background)
    *   `charcoal`: `#1A1A2E` (Used for text instead of pure black)
*   **CSS Utilities (`src/app/globals.css`)**:
    *   Always use `shadow-premium` for elevated cards.
    *   Use `bg-hero-gradient` or `bg-sage-gradient` for rich background sections.
    *   Avoid hard borders; use `border-white/20` combined with glassmorphism (`backdrop-blur-md`, `bg-white/15`) for floating UI elements.
*   **Typography**: Relies on `font-display` (Playfair Display) for headlines and `font-sans` (Inter) for body text.

### 5. Product Data
*   All product data is currently mocked in `src/lib/products.ts`.
*   Categories include: `Fruit Boxes`, `Catering` (which features newly added "Lunchbags"), and `Corporate Gifts`.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
