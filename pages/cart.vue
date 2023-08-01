<script lang="ts" setup>
// Variables
const shippingCost = 10;
const taxCost = 8.75;
const { $swal } = useNuxtApp();
const { id } = useRoute().query;
const config = useRuntimeConfig();
const apiUrl = config.public.baseURL;

// Data fetching
const { data } = await useFetch<Cart>(`${apiUrl}/carts/${id}`);
const cartProducts = data.value!.products;
const promises = cartProducts.map(({ productId }) =>
  useFetch<ProductItem>(`${apiUrl}/products/${productId}`)
);
const responses = await Promise.all(promises);
const products = ref(
  responses.map((res) => ({
    ...res.data.value!,
    quantity: cartProducts.find((item) => item.productId === res.data.value?.id)
      ?.quantity,
  }))
);

// Computed
const subtotal = computed(() => {
  return products.value.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 0),
    0
  );
});
const total = computed(() => subtotal.value + shippingCost + taxCost);

// Methods
function onChangeQuantity(productId: number, quantity: number) {
  products.value = products.value.map((product) => {
    if (product.id === productId) {
      return { ...product, quantity };
    }
    return product;
  });
}

function onRemoveProduct(productId: number) {
  products.value = products.value.filter((product) => product.id !== productId);
}

async function onCheckout() {
  await $swal.fire({
    title: "Success!",
    text: "Your order has been placed!",
    icon: "success",
    confirmButtonText: "OK",
  });

  // Redirect to Homepage after checkout
  navigateTo("/");
}
</script>

<template>
  <h1
    class="text-4xl py-8 text-center font-semibold border-b border-b-slate-200"
  >
    Your Shopping bag
  </h1>

  <NotFoundItem v-if="products.length === 0" />

  <div v-else class="max-w-7xl mx-auto grid grid-cols-3 px-4 gap-8 py-8">
    <CartItems
      :products="(products as CartItem[])"
      @changeQuantity="onChangeQuantity"
      @removeProduct="onRemoveProduct"
    />

    <PaymentSummary
      :subtotal="subtotal"
      :shipping="shippingCost"
      :tax="taxCost"
      :total="total"
      @checkout="onCheckout"
    />
  </div>
</template>
