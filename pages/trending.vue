<script lang="ts" setup>
const config = useRuntimeConfig();
const apiUrl = config.public.baseURL;
const { data: products } = await useAsyncData<ProductItem[]>(
  "trending-products",
  () => $fetch(`${apiUrl}/products`)
);
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <header
      class="w-full p-16 flex flex-col gap-8 text-center border-b border-b-slate-200"
    >
      <h1 class="uppercase font-bold text-6xl">Trending Products</h1>
      <h3 class="text-xl">All handpicked products by our team of experts</h3>
    </header>

    <ProductList withOverlay withFilter :withBorder="false" :items="products" />
  </div>
</template>
