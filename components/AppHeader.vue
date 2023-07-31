<script lang="ts" setup>
const config = useRuntimeConfig();
const apiUrl = config.public.baseURL;
const { data } = await useFetch<string[]>(`${apiUrl}/products/categories`);

// Random cart id from 1 to 7 for demo purpose
const cartId = Math.floor(Math.random() * (7 - 1) + 1);
</script>

<template>
  <div
    class="w-full border-b border-slate-200 shadow-lg sticky inset-0 top-0 z-10 bg-white"
  >
    <header
      class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
    >
      <NuxtLink to="/">
        <h1 class="text-4xl text-green-500">Nuxicommerce</h1>
      </NuxtLink>

      <!-- Navbar Items -->
      <nav class="flex items-center gap-6 uppercase">
        <NuxtLink :to="`/category/${item}`" v-for="item in data">
          <div
            class="cursor-pointer duration-150 transition hover:text-black text-green-500 font-semibold"
          >
            {{ item }}
          </div>
        </NuxtLink>
      </nav>

      <!-- Bookmarked items & Cart list -->
      <div class="flex items-center gap-4">
        <!-- <Icon
          role="button"
          name="material-symbols:bookmark"
          class="text-green-500 text-4xl"
        /> -->
        <NuxtLink
          :to="`/cart?id=${cartId}`"
          class="relative bg-green-500 p-1 rounded-lg"
        >
          <Icon
            name="material-symbols:shopping-bag"
            class="text-white text-3xl"
          />
          <span
            class="absolute inline-flex items-center justify-center w-6 h-6 font-bold bg-red-500 z-10 text-white pt-1.5 rounded-full text-2xl -top-2 -right-2"
            >*</span
          >
        </NuxtLink>
      </div>
    </header>
  </div>
</template>
