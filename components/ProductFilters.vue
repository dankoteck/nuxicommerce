<script lang="ts" setup>
defineEmits(["sort", "filter"]);
</script>

<template>
  <div class="flex items-center justify-end gap-10 px-6 py-4">
    <div class="flex items-center gap-4">
      <span class="">Sort by</span>
      <select
        class="tw-select"
        @change="(evt) => $emit('sort', (evt.target as HTMLSelectElement).value)"
      >
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>

    <div class="flex items-center gap-4">
      <span class="">Filter by</span>

      <select
        class="tw-select"
        @change="(evt) => $emit('filter', 'price', (evt.target as HTMLSelectElement).value)"
      >
        <option selected class="" disabled>Price</option>
        <option value="<= $50" class="">Below $50</option>
        <option value="50 150" class="">$50 - $150</option>
        <option value="150 300" class="">$150 - $300</option>
        <option value="300 500" class="">$300 - $500</option>
        <option value="500 700" class="">$500 - $700</option>
        <option value=">= $700" class="">Above $700</option>
      </select>

      <select
        class="tw-select"
        @change="(evt) => $emit('filter', 'rating', (evt.target as HTMLSelectElement).value)"
      >
        <option selected class="" disabled>Rating</option>
        <option value="3" class="">3 ⭐️</option>
        <option value="4" class="">4 ⭐️</option>
        <option value="5" class="">5 ⭐️</option>
      </select>
    </div>
  </div>
</template>
