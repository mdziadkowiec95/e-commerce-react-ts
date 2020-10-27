import { createSelector } from "@reduxjs/toolkit";
import { ProductInCart } from "common/types";
import { RootState } from "redux/rootReducer";

export const getIsLoading = (state: RootState) => state.cart.isLoading;

export const getProducts = (state: RootState) => state.cart.products;

export const getProductsTotalQuantity = createSelector(
  [getProducts], (products: ProductInCart[]) => products.reduce(
    (sum: number, product: ProductInCart) => sum + product.quantity,
    0)
);
