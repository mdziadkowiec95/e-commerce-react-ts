import React from 'react';
import { Product } from '../../common/types/product';
import ProductCard from '../ProductCard';

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  if (!products || !products.length) return null;

  // Uncomment the line below to simulate more products
  // products = [...products, ...products, ...products];

  return (
    <div className="columns is-multiline mt-6">
      {products.map((product: Product) => (
        <div
          key={product.id}
          className="column is-half-tablet is-one-third-widescreen is-one-quarter-fullhd"
        >
          <ProductCard data={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
