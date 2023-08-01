import Swal from "sweetalert2";

const FilterBy: Record<
  string,
  (products: ProductItem[] | null, filterValue: string) => ProductItem[]
> = {
  price: (products: ProductItem[] | null, value: string) => {
    if (!products) return [];
    return products.filter((item) => {
      const price = item.price;
      const [min, max] = value.split(" ");

      if (min === "<=" && price <= parseInt(max)) {
        return true;
      }
      if (min === ">=" && price >= parseInt(max)) {
        return true;
      }
      if (min !== "<=" && min !== ">=") {
        return price >= parseInt(min) && price <= parseInt(max);
      }
      return false;
    });
  },

  rating: (products: ProductItem[] | null, value: string) => {
    if (!products) return [];
    return products?.filter((item) => {
      const { rating } = item;
      return rating.rate >= parseInt(value);
    });
  },
};

function getMarkedProducts(): ProductItem[] {
  if (process.server) return [];
  const products = localStorage.getItem("markedProducts") ?? "[]";
  const markedProducts = ref(JSON.parse(products));
  return markedProducts.value;
}

function saveMarkedProducts(product: ProductItem) {
  const { id } = product;
  const markedProducts = getMarkedProducts();
  const newMarkedProducts = isProductMarked(id)
    ? markedProducts?.filter((item) => item.id !== id)
    : [...(markedProducts ?? []), product];

  localStorage.setItem("markedProducts", JSON.stringify(newMarkedProducts));
}

function isProductMarked(id: number): boolean | null {
  const markedProducts = getMarkedProducts();
  if (!markedProducts || markedProducts?.length === 0) return false;
  return markedProducts.findIndex((product) => product.id === id) > -1;
}

function addToCart() {
  // For training purpose only
  Swal.fire({
    title: "Success!",
    text: "Item added to bag!",
    icon: "success",
    confirmButtonText: "OK",
  });
}

export function useCart() {
  return {
    getMarkedProducts,
    saveMarkedProducts,
    isProductMarked,
    addToCart,
    FilterBy,
  };
}
