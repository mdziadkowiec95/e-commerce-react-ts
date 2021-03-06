import React, { useEffect } from 'react';
import { useAppDispatch } from '../redux/store';
import * as ProductsThunks from '../redux/Products/products.thunks';
import ProductList from '../components/ProductList/ProductList';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';

interface Props {
  rootCategory?: string;
  subCategory?: string;
}

const ProductsContainer = ({ rootCategory, subCategory }: Props) => {
  const dispatch = useAppDispatch();
  const productsState = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(ProductsThunks.fetchProducts(rootCategory, subCategory));
  }, [dispatch, rootCategory, subCategory]);
  return <ProductList products={productsState.items} />;
};

export default ProductsContainer;
