import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],
  addItem: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
    })),
  removeItem: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    })),
  clearCart: () =>
    set(() => ({
      cartItems: [],
    })),
}));

export default useCartStore;
