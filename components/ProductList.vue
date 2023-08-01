<script lang="ts" setup>
// Types
type Props = {
  title?: string;
  browseText?: string;
  withOverlay?: boolean;
  withFilter?: boolean;
  withBorder?: boolean;
  items: ProductItem[] | null;
  navigateTo?: string;
};

// Variables
const loading = ref(false);
const CartContext = useCart();

// Props
const { title, items } = withDefaults(defineProps<Props>(), {
  title: "",
  browseText: "",
  withOverlay: false,
  withFilter: false,
  withBorder: true,
});

const products = ref<ProductItem[] | null>(items);
const id = title?.toLowerCase().replace(/\s/g, "-");

// Methods
async function onSort(sort: string) {
  // Simulate API call
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;

  if (sort === "desc") {
    products.value = products.value?.reverse() as ProductItem[];
  } else {
    products.value = products.value?.sort((a, b) =>
      a.title.localeCompare(b.title)
    ) as ProductItem[];
  }
}

async function onFilter(key: string, value: string) {
  // Simulate API call
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;

  products.value = CartContext.FilterBy[key](products.value, value);
}

async function onMarked(item: ProductItem) {
  // Simulate API call
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loading.value = false;

  CartContext.saveMarkedProducts(item);
}

// Watchers
watch(
  () => items,
  (newItems) => {
    products.value = newItems;
  }
);
</script>

<template>
  <div class="flex flex-col gap-4 my-24" :id="id">
    <ProductFilters v-if="withFilter" @sort="onSort" @filter="onFilter" />

    <div class="flex items-center justify-between">
      <p class="font-semibold text-xl">{{ title }}</p>
      <NuxtLink :to="navigateTo">
        <p v-if="browseText" class="text-green-600 cursor-pointer">
          {{ browseText }} →
        </p>
      </NuxtLink>
    </div>

    <LoadingSpinner :spinning="loading">
      <NotFoundItem
        v-if="!products || products?.length === 0"
        :cta="false"
        title="Not Found !"
        message="Your filter did not match any products. :-("
      />

      <div
        :class="withBorder ? 'border-slate-200 border-t border-l' : ''"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        v-if="products"
      >
        <div
          v-for="item in products"
          :key="item.id"
          :class="withBorder ? 'border-slate-200 border-r border-b' : ''"
          class="flex flex-col gap-3 cursor-pointer text-sm p-6 group relative"
        >
          <div class="relative pb-8">
            <div class="z-50 absolute top-0 right-0">
              <ClientOnly>
                <button
                  @click="onMarked(item)"
                  :class="
                    CartContext.isProductMarked(item.id)
                      ? 'bg-red-500 text-white'
                      : 'text-red-500 bg-white'
                  "
                  class="border border-red-500 rounded-full p-1.5"
                >
                  <Icon name="mdi:heart-outline" class="text-2xl" />
                </button>
              </ClientOnly>
            </div>
            <NuxtLink :to="'/product/' + item.id">
              <div
                class="absolute rounded-lg left-0 text-center right-0 bottom-0 h-36 bg-gradient-to-t from-black/50"
                v-if="withOverlay"
              >
                <button
                  @click="CartContext.addToCart"
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
            </NuxtLink>
          </div>

          <p class="font-semibold text-lg line-clamp-1 py-1">
            {{ item.title }}
          </p>
          <p class="line-clamp-3">{{ item.description }}</p>
          <div class="flex items-center justify-between">
            <p class="text-red-500 font-medium text-lg">${{ item.price }}</p>
            <p class="">
              {{ Math.floor(item.rating.rate) }} ⭐️ ({{ item.rating.count }})
            </p>
          </div>

          <button
            v-if="!withOverlay"
            @click="CartContext.addToCart"
            class="w-full border border-green-500 transition duration-150 hover:bg-green-500 hover:text-white py-2 text-center rounded-md mt-3"
          >
            Add to bag
          </button>
        </div>
      </div>
    </LoadingSpinner>
  </div>
</template>
