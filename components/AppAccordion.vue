<script lang="ts" setup>
defineProps<{
  title?: string;
}>();

const open = ref(false);
</script>

<template>
  <div class="border-t border-t-slate-200 py-4">
    <button
      type="button"
      @click="open = !open"
      class="flex items-center justify-between w-full py-3 focus:outline-none focus:ring-0 font-medium text-left"
    >
      <span
        class="transition duration-150"
        :class="{ 'text-green-500': open }"
        >{{ title }}</span
      >
      <Icon
        :name="open ? 'ph:caret-down-bold' : 'ph:caret-up-bold'"
        :class="{ 'text-green-500': open }"
        class="text-xl transition duration-150"
      />
    </button>
    <div
      :class="open ? 'opacity-100 block' : 'opacity-0 hidden overflow-hidden'"
      class="p-5 pt-0 transition duration-50"
    >
      <slot />
    </div>
  </div>
</template>
