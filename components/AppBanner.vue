<script lang="ts" setup>
const element = window.document.querySelector("#trending-products");
const top = ref(element ? element.getBoundingClientRect().top : 0);
const threshold = 500;

function smoothScroll() {
  window.scrollTo({ top: top.value + threshold, behavior: "smooth" });
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-col gap-4 flex-1">
      <h1 class="text-green-500 text-7xl">
        Nuxicommerce &
        <br />
        Fake Store Api.
      </h1>

      <p class="text-lg text-gray-700">
        Fake Store Api will returns all the Products, Categories, Cart items so
        we can integrate an API to our Nuxt App
      </p>

      <button
        @click="smoothScroll"
        class="uppercase text-lg bg-green-500 hover:bg-green-600 transition duration-150 text-white px-4 py-2 text-center rounded-md w-fit mt-3"
      >
        Explore Now !
      </button>
    </div>

    <!-- Thumbnail for random product -->
    <div class="flex-1 relative pl-36">
      <img
        alt="Thumbnail"
        src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        class="aspect-square w-full h-full object-cover rounded-[50px]"
      />
    </div>
  </div>
</template>
