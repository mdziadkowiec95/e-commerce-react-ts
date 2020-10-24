import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Product } from '../../common/types/product';
import ButtonIcon from '../../common/components/ButtonIcon';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const getProductMainImageSrc = (product: Product) => {
  const placeholderImageURL =
    'https://lh3.googleusercontent.com/proxy/eXYNdjvMGNiClMD8LW7qN3XgYHBGOxqXNes5FO96_Bm5KYE72k4yUW9Z74CwVOSO48ORsxgEEX8fkE6gqlkiscOLeHQlxZ8F8aSxyp0D-qmLGEfo5q4vw16LbcI';
  return product?.image?.[0].fields.file.url || placeholderImageURL;
};
export const getProductMainImageAlt = (product: Product) => {
  return product?.image?.[0]?.fields?.title;
};

const ProductCard = ({ product, onAddToCart }: Props) => {
  return (
    <div className={`card ${styles.wrap}`}>
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={getProductMainImageSrc(product)}
            alt={getProductMainImageAlt(product)}
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{product.productName}</p>
            <p className="subtitle is-6">{product.price}$</p>
          </div>
        </div>

        <div className="content">
          <ButtonIcon
            isFullwidth
            icon={faCartPlus}
            onClick={() => {
              onAddToCart(product);
            }}
          >
            Add to cart
          </ButtonIcon>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
