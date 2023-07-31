<script lang="ts" setup>
const products = ref<ProductItem[] | null>(null);

onMounted(() => {
  if (process.server) return;
  products.value = useMarkedProducts();
});
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <header
      class="w-full p-16 flex flex-col gap-8 text-center border-b border-b-slate-200"
    >
      <h1 class="uppercase font-bold text-6xl">Your Marked Products</h1>
      <h3 class="text-xl">
        {{ products?.length }} product
        <span v-if="products && products.length > 1">s</span> marked
      </h3>
    </header>

    <main class="">
      <ClientOnly>
        <ProductList
          :items="products"
          :withFilter="false"
          :withBorder="false"
          :withMarked="false"
          :withOverlay="false"
        />
      </ClientOnly>
    </main>
  </div>
</template>
