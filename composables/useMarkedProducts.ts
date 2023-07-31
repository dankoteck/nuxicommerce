export function useMarkedProducts(): ProductItem[] {
  let markedProducts = [];
  const products = localStorage.getItem("markedProducts") ?? "[]";
  markedProducts = JSON.parse(products);
  return markedProducts;
}

export function isProductMarked(id: number): boolean {
  const markedProducts = useMarkedProducts();
  if (!markedProducts || markedProducts.length === 0) return false;
  return markedProducts.some((product) => product.id === id);
}
