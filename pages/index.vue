<script lang="ts" setup>
const config = useRuntimeConfig();
const apiUrl = `${config.public.baseURL}/products`;

const [
  { data: trendingSearches },
  { data: trendingProducts },
  { data: electronicProducts },
  { data: jeweleryProducts },
  { data: mensClothing },
  { data: womensClothing },
] = await Promise.all([
  useFetch<string[]>(`${apiUrl}/categories`),
  useFetch<ProductItem[]>(`${apiUrl}?limit=8`),
  useFetch<ProductItem[]>(`${apiUrl}/category/electronics`),
  useFetch<ProductItem[]>(`${apiUrl}/category/jewelery`),
  useFetch<ProductItem[]>(`${apiUrl}/category/men's clothing`),
  useFetch<ProductItem[]>(`${apiUrl}/category/women's clothing`),
]);

const productSections = computed(() => [
  {
    title: "Trending Products",
    browseText: "Shop the collection",
    navigateTo: "/trending",
    items: trendingProducts.value,
    withOverlay: true,
  },
  {
    title: "Electronic Products",
    browseText: "See everything",
    navigateTo: "/category/electronics",
    items: electronicProducts.value,
  },
  {
    title: "Jewelery Products",
    browseText: "Browse the collection",
    navigateTo: "/category/jewelery",
    items: jeweleryProducts.value,
    withOverlay: true,
  },
  {
    title: "Men's Clothing Products",
    browseText: "View all",
    navigateTo: "/category/men's clothing",
    items: mensClothing.value,
  },
  {
    title: "Women's Clothing Products",
    browseText: "Get the look",
    navigateTo: "/category/women's Clothing",
    items: womensClothing.value,
    withOverlay: true,
  },
]);
</script>

<template>
  <div class="max-w-7xl mx-auto px-8">
    <SearchInput :searches="trendingSearches" />

    <ClientOnly>
      <AppBanner />
    </ClientOnly>

    <ProductList
      v-for="section in productSections"
      v-bind="section"
      :key="section.title"
    />
  </div>
</template>
