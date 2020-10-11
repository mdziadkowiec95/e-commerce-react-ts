import React from 'react';
import { useParams } from 'react-router';
import ProductsContainer from '../../containers/ProductsContainer';

interface RouteParams {
  rootCategory: string;
  subCategory: string;
}

const Products = () => {
  const { rootCategory, subCategory } = useParams<RouteParams>();

  return (
    <ProductsContainer rootCategory={rootCategory} subCategory={subCategory} />
  );
};

export default Products;
