<script lang="ts" setup>
defineProps<{
  searches: string[] | null;
}>();

const search = ref("");

function onSearch() {
  console.log(search.value);
}
</script>

<template>
  <div class="flex flex-col gap-8 text-center py-16">
    <input
      v-model="search"
      @keydown.enter="onSearch"
      placeholder="Search..."
      class="border border-slate-200 mx-auto rounded-2xl px-4 py-2 w-full max-w-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
    />

    <span class="text-xs">
      Trending searches
      <span
        class="px-2 py-1 rounded-full border border-slate-200 transition duration-150 hover:bg-green-600 hover:border-green-600 cursor-pointer hover:text-white ml-2"
        v-for="tag in searches"
      >
        {{ tag }}
      </span>
    </span>
  </div>
</template>
