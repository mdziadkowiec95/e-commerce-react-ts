import React from 'react';
import { mapProductImageForCart } from '../common/product/mapProductImage';
import { Product } from '../common/types/product';
import ProductCard from '../components/ProductCard';
import * as CartThunks from '../redux/Cart/cart.thunks';
import { useAppDispatch } from '../redux/store';

interface Props {
  product: Product;
}

const ProductCardContainer = ({ product }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <ProductCard
      product={product}
      onAddToCart={({
        id,
        image,
        slug,
        price,
        quantity,
        productName,
      }: Product) => {
        dispatch(
          CartThunks.addProductToCart({
            id,
            image: mapProductImageForCart(image),
            slug,
            price,
            quantity,
            productName,
          })
        );
      }}
    />
  );
};

export default ProductCardContainer;
