import React from 'react';
import { Product } from '../../common/types/product';
import styles from './ProductCard.module.scss';

interface Props {
  data: Product;
}

export const getProductMainImageSrc = (product: Product) => {
  const placeholderImageURL =
    'https://lh3.googleusercontent.com/proxy/eXYNdjvMGNiClMD8LW7qN3XgYHBGOxqXNes5FO96_Bm5KYE72k4yUW9Z74CwVOSO48ORsxgEEX8fkE6gqlkiscOLeHQlxZ8F8aSxyp0D-qmLGEfo5q4vw16LbcI';
  return product?.image?.[0].fields.file.url || placeholderImageURL;
};
export const getProductMainImageAlt = (product: Product) => {
  return product?.image?.[0]?.fields?.title;
};

const ProductCard = ({ data }: Props) => {
  return (
    <div className={`card ${styles.wrap}`}>
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={getProductMainImageSrc(data)}
            alt={getProductMainImageAlt(data)}
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{data.productName}</p>
            <p className="subtitle is-6">{data.price}$</p>
          </div>
        </div>

        <div className="content">
          <button className="button is-primary is-fullwidth is-rounded">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
