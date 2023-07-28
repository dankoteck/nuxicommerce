<script lang="ts" setup>
// Variables
const { $swal } = useNuxtApp();

// Props
const { title } = defineProps<{
  title: string;
  browseText: string;
  withOverlay: boolean;
  items: ProductItem[] | null;
}>();

const id = title.toLowerCase().replace(/\s/g, "-");

// Methods
function addToBag() {
  $swal.fire({
    title: "Success!",
    text: "Item added to bag!",
    icon: "success",
    confirmButtonText: "OK",
  });
}
</script>

<template>
  <div class="flex flex-col gap-4 my-24" :id="id">
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
            class="absolute rounded-lg left-0 text-center right-0 bottom-0 h-36 bg-gradient-to-t from-black/50"
            v-if="withOverlay"
          >
            <button
              @click="addToBag"
              class="w-fit group-hover:opacity-100 px-16 border opacity-0 border-green-500 transition duration-150 bg-green-500 text-white py-2 text-center rounded-md"
            >
              Add to bag
            </button>
          </div>

          <img
            :src="item.image"
            :alt="item.description"
            :class="{ 'group-hover:opacity-60': !withOverlay }"
            class="aspect-square w-full h-full object-contain object-bottom transition duration-150"
          />
        </div>

        <p class="font-semibold text-lg line-clamp-1 py-1">{{ item.title }}</p>
        <p class="line-clamp-3">{{ item.description }}</p>
        <p class="text-red-500 font-medium text-lg">${{ item.price }}</p>

        <button
          v-if="!withOverlay"
          @click="addToBag"
          class="w-full border border-green-500 transition duration-150 hover:bg-green-500 hover:text-white py-2 text-center rounded-md mt-3"
        >
          Add to bag
        </button>
      </div>
    </div>
  </div>
</template>
