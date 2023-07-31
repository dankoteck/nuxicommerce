<script lang="ts" setup>
defineEmits(["sort"]);
</script>

<template>
  <div class="flex items-center justify-between px-6 py-4">
    <select
      class="tw-select"
      @change="(evt) => $emit('sort', (evt.target as HTMLSelectElement).value)"
    >
      <option value="asc">A-Z</option>
      <option value="desc">Z-A</option>
    </select>
  </div>
</template>
