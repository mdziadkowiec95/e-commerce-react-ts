import { ProductInCart } from "common/types";
import { CartState } from "redux/Cart/cart.reducer";

export const getTotalProductsCount = (cart: CartState) =>
  cart.products.reduce(
    (sum: number, product: ProductInCart) => sum + product.quantity,
    0
  );