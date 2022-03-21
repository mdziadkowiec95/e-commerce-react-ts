import { AnyProduct } from "../types/product";

export const getTotalPrice = (products: AnyProduct[]) => {
  if (!products || !products.length) return 0;

  return products.reduce(
    (sum: number, product: AnyProduct) =>
      sum + product.quantity * product.price,
    0
  );
};