<script lang="ts" setup>
defineProps<{
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}>();

defineEmits(["checkout"]);
</script>

<template>
  <div class="space-y-6 rounded-lg bg-slate-50 p-8 self-baseline">
    <h2 class="text-2xl font-semibold text-center">Payment</h2>

    <div class="flex items-center justify-between">
      <span class="">Subtotal</span>
      <span class="">${{ subtotal }}</span>
    </div>

    <div class="flex items-center justify-between">
      <span class="">Shipping</span>
      <span class="">${{ shipping }}</span>
    </div>

    <div class="flex items-center justify-between">
      <span class="">Tax</span>
      <span class="">${{ tax }}</span>
    </div>

    <div class="flex items-center justify-between text-lg font-medium">
      <span class="">Order total</span>
      <span class="">${{ total }}</span>
    </div>

    <button
      @click="$emit('checkout')"
      class="w-full transition duration-150 py-3 bg-green-500 text-white hover:bg-green-600 cursor-pointer text-center text-lg rounded-md"
    >
      Checkout
    </button>
  </div>
</template>
