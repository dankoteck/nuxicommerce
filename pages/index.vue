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
    items: trendingProducts.value,
    withOverlay: true,
  },
  {
    title: "Electronic Products",
    browseText: "See everything",
    items: electronicProducts.value,
    withOverlay: false,
  },
  {
    title: "Jewelery Products",
    browseText: "Browse the collection",
    items: jeweleryProducts.value,
    withOverlay: true,
  },
  {
    title: "Men's Clothing Products",
    browseText: "View all",
    items: mensClothing.value,
    withOverlay: false,
  },
  {
    title: "Women's Clothing Products",
    browseText: "Get the look",
    items: womensClothing.value,
    withOverlay: true,
  },
]);
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <SearchInput :searches="trendingSearches" />

    <AppBanner />

    <ProductLists
      v-for="section in productSections"
      v-bind="section"
      :key="section.title"
    />
  </div>
</template>
