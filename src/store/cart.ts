import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, SubscriptionFrequency, PurchaseType } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addItem: (product: Product, purchaseType?: PurchaseType, frequency?: SubscriptionFrequency, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Computed helpers
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, purchaseType = "onetime", frequency = "weekly", quantity = 1) => {
        set((state) => {
          // We distinguish items not just by ID but also by purchase type
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.purchaseType === purchaseType
          );
    
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.purchaseType === purchaseType
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
              isOpen: true,
            };
          }
    
          // Limit test orders to 1 per item
          if (purchaseType === "test") {
            const hasTest = state.items.some(i => i.purchaseType === "test");
            if (hasTest) {
              return { isOpen: true };
            }
          }
    
          return {
            items: [...state.items, { product, quantity, purchaseType, frequency }],
            isOpen: true,
          };
        });
      },

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => {
          if (i.purchaseType === "test") return sum; // Free test order
          
          const price = i.purchaseType === "subscription" && i.frequency
            ? i.product.subscriptionPrices[i.frequency]
            : i.product.price;
          return sum + price * i.quantity;
        }, 0),
    }),
    { name: "greencrate-cart", skipHydration: true }
  )
);
