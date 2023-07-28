<script lang="ts" setup>
defineProps<{
  title: string;
  browseText: string;
  withOverlay: boolean;
  items: ProductItem[] | null;
}>();
</script>

<template>
  <div class="flex flex-col gap-4 my-24">
    <div class="flex items-center justify-between">
      <p class="font-semibold text-xl">{{ title }}</p>
      <p class="text-green-600 cursor-pointer">{{ browseText }} →</p>
    </div>

    <div
      class="grid grid-cols-4 border-slate-200 border-t border-l"
      v-if="items"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="flex flex-col gap-3 cursor-pointer text-sm border-slate-200 border-r border-b p-6 group"
      >
        <div class="relative pb-8">
          <div
            class="absolute rounded-lg left-0 right-0 bottom-0 opacity-50 h-36 bg-gradient-to-t from-black"
            v-if="withOverlay"
          />

          <img
            :src="item.image"
            :alt="item.description"
            :class="{ 'group-hover:opacity-60': !withOverlay }"
            class="aspect-square w-full h-full object-contain object-bottom transition duration-150"
          />
        </div>

        <p class="font-semibold text-lg line-clamp-1 py-1">{{ item.title }}</p>
        <p class="line-clamp-3 py-4">{{ item.description }}</p>
        <p class="text-red-500 font-medium text-lg">${{ item.price }}</p>
      </div>
    </div>
  </div>
</template>
