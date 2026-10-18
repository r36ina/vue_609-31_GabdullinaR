import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
    state: () => ({
        items: [],
    }),
    getters: {
        isFavorite: (state) => (productId) =>
            state.items.some((p) => p.id === productId),
    },
    actions: {
        toggleFavorite(product) {
            const index = this.items.findIndex((p) => p.id === product.id);
            if (index === -1) {
                this.items.push(product);
            } else {
                this.items.splice(index, 1);
            }
        },
    },
    persist: true,
});