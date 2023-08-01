<script lang="ts" setup>
defineProps<{
  products: CartItem[];
}>();

defineEmits(["changeQuantity", "removeProduct"]);
</script>

<template>
  <div class="col-span-3 lg:col-span-2 px-8">
    <div
      v-for="product in products"
      class="border-b border-b-slate-200 py-8 grid grid-cols-3 gap-8"
    >
      <!-- Product Information -->
      <div class="flex col-span-2 gap-4">
        <img
          :src="product.image"
          :alt="product.description"
          class="aspect-square shrink-0 rounded-md w-40 h-40 object-contain object-center"
        />
        <div class="flex-1 space-y-2">
          <p class="line-clamp-2 font-medium">{{ product.title }}</p>
          <p class="text-gray-500">{{ product.category }}</p>
          <p class="text-red-500 font-medium text-lg">${{ product.price }}</p>
        </div>
      </div>

      <!-- Select quantity -->
      <div class="flex justify-between h-fit gap-4">
        <select
          class="tw-select"
          :value="product.quantity"
          @change="(evt) => $emit('changeQuantity',product.id, +(evt.target as HTMLSelectElement).value)"
        >
          <option v-for="q in 10" :value="q" :key="q">
            {{ q }}
          </option>
        </select>

        <button
          @click="$emit('removeProduct', product.id)"
          class="w-fit px-4 border border-red-500 transition duration-150 py-1 hover:bg-red-500 hover:text-white cursor-pointer text-center rounded-md"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
