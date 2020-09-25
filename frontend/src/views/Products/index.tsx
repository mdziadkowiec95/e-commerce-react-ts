import React from 'react';
import { useParams } from 'react-router';
import ContentfulService from '../../services/ContentfulService';

interface RouteParams {
  rootCategory: string,
  subCategory: string
}

const Products = () => {
    const { rootCategory, subCategory } = useParams<RouteParams>();

    console.log(rootCategory, subCategory);

    ContentfulService.getProducts(rootCategory, subCategory).then(res => {
      console.log(res);
    })

    return (
      <div>
          Products view
      </div>
    );
}

export default Products;