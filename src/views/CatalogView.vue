<script>
import axios from 'axios';
import VProduct from "../components/VProduct.vue";
import SearchInput from "../components/SearchInput.vue";
import SortSelect from "../components/SortSelect.vue";
import ProductSkeletonLoader from '../components/ProductSkeletonLoader.vue';

export default {
    components: {VProduct, SearchInput, SortSelect, ProductSkeletonLoader},
    data() {
        return {
            items: [],
            showSkeletonLoader: true,
            searchQuery: "",
            sortBy: localStorage.getItem('shop_sort_by') || 'default',
            sortOptions: [
                {value: "default", label: "По умолчанию"},
                {value: "price-asc", label: "Сначала дешевые"},
                {value: "price-desc", label: "Сначала дорогие"},
                {value: "name-asc", label: "Название (А-Я)"},
                {value: "name-desc", label: "Название (Я-А)"},
            ],
        };
    },
    watch: {
        sortBy(newValue) {
            localStorage.setItem("shop_sort_by", newValue);
        },
    },
    methods: {
        async fetchItems() {
        try {
            const {data} = await axios.get("https://7a0532a2ccc1c45d.mokky.dev/items")
            this.items = data.map((obj) => ({
            ...obj,
            isFavorite: false,
            isAdded: false,
            }));
        } catch(e) {
            console.log(e);
        }
        },
    },
    computed: {
        filteredProducts() {
            let result = [...this.items];

            if (this.searchQuery.trim() !== "") {
                const query = this.searchQuery.toLowerCase();
                result = result.filter((product) =>
                    product.title.toLowerCase().includes(query),
                );
            }

            if (this.sortBy === "price-asc") {
                result.sort((a, b) => a.price - b.price);
            } else if (this.sortBy === "price-desc") {
                result.sort((a, b) => b.price - a.price);
            } else if (this.sortBy === "name-asc") {
                result.sort((a, b) =>
                    a.title.localeCompare(b.title, ["ru", "en"], {
                        sensitivity: "base",
                    }),
                );
            } else if (this.sortBy === "name-desc") {
                result.sort((a, b) =>
                    b.title.localeCompare(a.title, ["ru", "en"], {
                        sensitivity: "base",
                    }),
                );
            }
            return result;
        },
    },
    async mounted() {
        await this.fetchItems();
        this.showSkeletonLoader = false;
    },
};
</script>

<template>
    <main class="pt-10">
        <div class="flex justify-between">
            <h1 class="text-[40px] font-bold mb-5">Каталог</h1>
            <div class="flex items-center gap-4">
                <search-input v-model="searchQuery" placeholder="Поиск по названию..."></search-input>
                <sort-select v-model="sortBy" :options="sortOptions"></sort-select>
            </div>
        </div>
        <div class="grid grid-cols-5 gap-5">
            <template v-if="showSkeletonLoader">
                <product-skeleton-loader v-for="value in 10" :key="value"/>
            </template>
            <template v-else>
                <v-product 
                    v-for="item in filteredProducts"
                    :key="item.id"
                    :product="item">
                </v-product>
                <p v-if="filteredProducts.length === 0">Товары не найдены</p>
            </template>
        </div>
    </main>
</template>