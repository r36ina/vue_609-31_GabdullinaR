<script>
import { useFavoritesStore } from "@/stores/favorites";
import VProduct from "@/components/VProduct.vue";

export default {
    components: {VProduct},
    data() {
        return {
            favoritesStore: useFavoritesStore(),
        };
    },
};
</script>
<template>
    <main class="pt-10">
        <h1 class="text-[40px] font-bold mb-5">Избранное</h1>
        <div v-if="favoritesStore.items.length === 0" class="flex flex-col gap-5">
            <p>В избранном пока ничего нет 🤍</p>
            <RouterLink class="underline" to="/">Перейти в каталог</RouterLink>
        </div>
        <div v-else class="grid grid-cols-5 gap-5">
            <v-product
                v-for="item in favoritesStore.items"
                :key="item.id"
                :product="item">
            </v-product>
        </div>
    </main>
</template>