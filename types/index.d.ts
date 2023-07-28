declare global {
  type ProductItem = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };

  type Cart = {
    id: number;
    userId: number;
    date: string;
    products: {
      productId: number;
      quantity: number;
    }[];
  };

  type CartItem = ProductItem & { quantity: number };
}

export {};
