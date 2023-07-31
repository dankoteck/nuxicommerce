<script lang="ts" setup>
const id = useRoute().params.id;
const watchId = ref(id);
const config = useRuntimeConfig();
const apiUrl = config.public.baseURL;

const { data: products } = await useAsyncData<ProductItem[]>(
  "products",
  () => $fetch(`${apiUrl}/products/category/${watchId.value}`),
  { watch: [watchId] }
);
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <header
      class="w-full p-16 flex flex-col gap-8 text-center border-b border-b-slate-200"
    >
      <h1 class="uppercase font-bold text-6xl">{{ id }}</h1>
      <h3 class="text-xl">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry
      </h3>
    </header>

    <main class="">
      <ProductList
        withOverlay
        withFilter
        :withBorder="false"
        :items="products"
      />
    </main>
  </div>
</template>
