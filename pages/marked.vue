<script lang="ts" setup>
const CartContext = useCart();
const products = ref<ProductItem[] | null>(CartContext.getMarkedProducts());
</script>

<template>
  <ClientOnly>
    <div class="max-w-7xl mx-auto">
      <header
        class="w-full p-16 flex flex-col gap-8 text-center border-b border-b-slate-200"
      >
        <h1 class="uppercase font-bold text-6xl">Your Marked Products</h1>
        <h3 class="text-xl">{{ products?.length }} product(s) marked</h3>
      </header>

      <main class="">
        <ProductList
          :items="products"
          :withFilter="false"
          :withBorder="false"
          :withMarked="false"
          :withOverlay="false"
        />
      </main>
    </div>
  </ClientOnly>
</template>
