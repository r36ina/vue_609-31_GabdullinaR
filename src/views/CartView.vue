<script>
import { useCartStore } from "@/stores/cart";
import CartProduct from "@/components/CartProduct.vue";

export default {
    components: {CartProduct},
    data() {
        return {
            cartStore: useCartStore(),
        };
    },
    methods: {
        checkout() {
            alert('Заказ успешно "оформлен"!');
            this.cartStore.clearCart();
            this.$router.push({name: "orders"});
        },
    },
};
</script>
<template>
    <main class="pt-10">
        <h1 class="text-[40px] font-bold mb-5">Корзина</h1>
        <div v-if="cartStore.items.length === 0" class="flex flex-col gap-5">
            <p>Корзина пуста 🛒</p>
            <RouterLink to="/" class="underline">Перейти к покупкам</RouterLink>
        </div>
        <div v-else class="flex gap-5 items-start">
            <div class="flex flex-2 flex-col gap-5">
                <cart-product
                    v-for="item in cartStore.items"
                    :key="item.id"
                    :product="item">
                </cart-product>
            </div>
            <div class="p-5 bg-slate-100 rounded-4xl flex flex-col gap-3 flex-1">
                <button @click="checkout"
                    class="p-4 bg-red-500 rounded-2xl text-white font-medium cursor-pointer hover:bg-red-400 transition">
                    Оформить заказ
                </button>
                <p class="text-slate-500 text-sm">Адрес и дополнительную информацию можно указать при оформлении заказа</p>
                <div class="flex justify-between items-end">
                    <div>
                        <h4 class="text-md font-bold">Итого:</h4>
                        <p>Товаров ({{ cartStore.totalItems }})</p>
                    </div>
                    <b class="text-xl">{{ cartStore.totalPrice.toLocaleString("ru-RU") }} ₽</b>
                </div>
            </div>
        </div>
    </main>
</template>