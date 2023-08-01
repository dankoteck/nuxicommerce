<script lang="ts" setup>
// Variables
const id = useRoute().params.id;
const config = useRuntimeConfig();
const url = config.public.baseURL;
const activeThumbnail = ref(0);
const loading = ref(false);
const CartContext = useCart();

const descriptions = [
  "Multiple strap configurations",
  "Spacious interior with top zip",
  "Leather handle and tabs",
  "Interior dividers",
  "Stainless strap loops",
  "Double stitched construction",
  "Water-resistant",
];
// Rotates for different thumbnails (because each product only has one image)
const thumbnailRotate = [
  "rotate-[0deg]",
  "rotate-[90deg]",
  "rotate-[180deg]",
  "rotate-[270deg]",
];

// Data fetching
const { data: product } = await useAsyncData<ProductItem>("product[id]", () =>
  $fetch(`${url}/products/${id}`)
);

// Methods
async function onMarked(product: ProductItem) {
  // Simulate API call
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;

  CartContext.saveMarkedProducts(product);
}
</script>

<template>
  <LoadingSpinner :spinning="loading">
    <div class="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div class="relative overflow-hidden">
          <img
            alt="Thumbnail"
            :src="product?.image"
            :class="thumbnailRotate[activeThumbnail]"
            class="object-contain object-center aspect-square"
          />
        </div>

        <div class="flex gap-4">
          <button
            v-for="(_, i) in 4"
            @click="activeThumbnail = i"
            :key="i"
            :class="activeThumbnail === i ? 'ring-2 ring-green-500' : ''"
            class="relative flex-1 border border-slate-200 cursor-pointer p-4 rounded-lg"
          >
            <img
              :src="product?.image"
              :alt="`${product?.image} - ${i}`"
              :class="thumbnailRotate[i]"
              class="object-contain aspect-square object-center rounded-lg"
            />
          </button>
        </div>
      </div>

      <div class="space-y-4 !mt-10 md:!mt-0">
        <h1 class="text-2xl font-semibold">{{ product?.title }}</h1>
        <h2 class="text-red-500 text-2xl font-semibold">
          ${{ product?.price }}
        </h2>

        <p class="">
          {{ Math.floor(product!.rating.rate) }} ⭐️ ({{
            product!.rating.count
          }})
        </p>

        <p class="">{{ product?.description }}</p>

        <div class="space-x-4">
          <button
            @click="CartContext.addToCart"
            class="uppercase text-xl bg-green-500 hover:bg-green-600 transition duration-150 text-white w-72 py-3 text-center rounded-md mt-3"
          >
            Add To Bag
          </button>

          <ClientOnly>
            <button
              :class="
              CartContext.isProductMarked(product!.id)
                ? 'bg-red-500 text-white'
                : 'text-red-500 bg-white'
            "
              class="border border-red-500 rounded-full transition duration-150 hover:bg-red-500 hover:text-white p-1.5 z-10"
              @click="onMarked(product!)"
            >
              <Icon name="mdi:heart-outline" class="text-2xl" />
            </button>
          </ClientOnly>
        </div>

        <div class="!mt-20">
          <AppAccordion title="Feature">
            <ul class="space-y-3 list-disc list-inside">
              <li class="text-base md:text-sm " v-for="desc in 4" :key="desc">
                {{ descriptions[desc] }}
              </li>
            </ul>
          </AppAccordion>

          <AppAccordion title="Care">
            <ul class="space-y-3 list-disc list-inside">
              <li class="text-base md:text-sm " v-for="desc in 6" :key="desc">
                {{ descriptions[desc] }}
              </li>
            </ul>
          </AppAccordion>

          <AppAccordion title="Shipping">
            <ul class="space-y-3 list-disc list-inside">
              <li class="text-base md:text-sm " v-for="desc in 2" :key="desc">
                {{ descriptions[desc] }}
              </li>
            </ul>
          </AppAccordion>

          <AppAccordion title="Return">
            <ul class="space-y-3 list-disc list-inside">
              <li class="text-base md:text-sm " v-for="desc in 5" :key="desc">
                {{ descriptions[desc] }}
              </li>
            </ul>
          </AppAccordion>
        </div>
      </div>
    </div>
  </LoadingSpinner>
</template>
