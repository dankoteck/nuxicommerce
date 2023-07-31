<script lang="ts" setup>
withDefaults(
  defineProps<{
    title?: string;
    message?: string;
    cta?: boolean;
  }>(),
  {
    title: "It's empty !",
    message: "Looks like you don't have any products in cart",
    cta: true,
  }
);
</script>

<template>
  <div class="flex flex-col gap-8 my-8">
    <img
      class="mx-auto"
      alt="Not found products gif"
      src="https://eyesome.netlify.app/static/media/empty-wish.5af0d55ffd0f31b86c32.gif"
    />
    <div class="text-center space-y-4">
      <h2 class="text-3xl font-medium uppercase">{{ title }}</h2>
      <h3 class="text-xl">{{ message }}</h3>
      <button
        v-if="cta"
        @click="navigateTo('/')"
        class="uppercase px-8 py-2 w-fit rounded-md bg-green-500 text-white text-lg"
      >
        Shopping Now
      </button>
    </div>
  </div>
</template>
