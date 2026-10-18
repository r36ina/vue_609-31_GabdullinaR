import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
    state: () => ({
        items: [],
    }),
    getters: {
        totalItems: (state) =>
            state.items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: (state) =>
            state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        isAdded: (state) => (productId) =>
            state.items.some((p) => p.id === productId),
    },
    actions: {
        addToCart(product) {
            const existing = this.items.find((item) => item.id === product.id);
            if (existing) {
                existing.quantity++;
            } else {
                this.items.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart(productId) {
            this.items = this.items.filter((item) => item.id !== productId);
        },
        updateQuantity(productId, amount) {
            const item = this.items.find((item) => item.id === productId);
            if (item) {
                item.quantity += amount;
                if (item.quantity <= 0) {
                    this.removeFromCart(productId);
                }
            }
        },
        clearCart() {
            this.items = [];
        },
    },
    persist: true,
});