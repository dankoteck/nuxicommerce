<script lang="ts" setup>
const config = useRuntimeConfig();
const apiUrl = config.public.baseURL;
const { data } = await useFetch<string[]>(`${apiUrl}/products/categories`);
</script>

<template>
  <div class="w-full border-b border-slate-200 shadow-lg">
    <header
      class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
    >
      <h1 class="text-4xl text-green-500">Nuxicommerce</h1>

      <!-- Navbar Items -->
      <nav class="flex items-center gap-6 uppercase">
        <div
          class="cursor-pointer duration-150 transition hover:text-black text-green-500 font-semibold"
          v-for="item in data"
        >
          {{ item }}
        </div>
      </nav>

      <!-- Bookmarked items & Cart list -->
      <div class="flex items-center gap-4">
        <Icon
          role="button"
          name="material-symbols:bookmark"
          class="text-green-500 text-4xl"
        />
        <Icon
          role="button"
          name="material-symbols:shopping-bag"
          class="text-green-500 text-4xl"
        />
      </div>
    </header>
  </div>
</template>
