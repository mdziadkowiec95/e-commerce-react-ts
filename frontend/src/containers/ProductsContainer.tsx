import React, { useEffect } from 'react';
import { useAppDispatch } from '../redux/store';
import * as ProductsThunks from '../redux/Products/products.thunks';

interface Props {
  rootCategory?: string;
  subCategory?: string;
}

const ProductsContainer = ({ rootCategory, subCategory }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ProductsThunks.fetchProducts(rootCategory, subCategory));
  }, [dispatch, rootCategory, subCategory]);
  return <div></div>;
};

export default ProductsContainer;
