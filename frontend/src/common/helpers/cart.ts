import { ProductInCart } from "common/types";

export const getTotalProductsCount = (items: ProductInCart[]) =>
  items.reduce(
    (sum: number, product: ProductInCart) => sum + product.quantity,
    0
  );