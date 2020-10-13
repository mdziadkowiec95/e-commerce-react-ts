import React from 'react';
import { mapProductImageForCart } from '../common/product/mapProductImage';
import { Product } from '../common/types/product';
import ProductCard from '../components/ProductCard';
import { CartActions } from '../redux/Cart/cart.reducer';
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
          CartActions.addProductToCart({
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
