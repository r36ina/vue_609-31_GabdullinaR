<script>
</script>

<template>
  <body class="flex flex-col justify-between h-dvh">
    <div class="mx-auto w-[1440px] mb-25">
      <nav class="py-3 border-b border-b-slate-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img src="/logo.svg" alt="">
            <p class="text-sm">Лучшие цены <br> в интернет-магазинах</p>
          </div>
          <ul class="flex gap-10">
            <li>
              <RouterLink :to="{name: 'cart'}" class="flex gap-3 items-center">
                <span class="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
                  <img src="/cart-icon.svg" alt="">
                </span>
                Корзина
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'favorites'}" class="flex gap-3 items-center">
                <span class="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
                  <img src="/like-outline.svg" alt="">
                </span>
                Избранное
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{name: 'orders'}" class="flex gap-3 items-center">
                <span class="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
                  <img src="/orders-icon.svg" alt="">
                </span>
                Заказы
              </RouterLink>
            </li>
          </ul>
        </div>
      </nav>
      <RouterView></RouterView>
    </div>
    <footer class="p-6 bg-slate-100">
      <div class="text-center text-slate-500">
        Copyright © 2023 Behoof, Inc. Все права защищены
      </div>
    </footer>
  </body>
</template>

<style scoped></style>
