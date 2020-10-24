import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import React, { MouseEvent } from 'react';
import { CURRENCY } from '../../common/baseConfig/price';
import { getTotalPrice } from '../../common/prices/getTotalPrice';
import { ProductInCart } from '../../common/types/product';
import { User } from '../../common/types/user';
import { CartState } from '../../redux/Cart/cart.reducer';
import ButtonIcon from '../ButtonIcon';
import Popover from '../Popover';
import styles from './MiniCart.module.scss';

interface ButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const MiniCartButton = ({ onClick }: ButtonProps) => (
  <ButtonIcon
    isFullwidth
    icon={faShoppingCart}
    isTransparent
    onClick={onClick}
  ></ButtonIcon>
);

interface Props {
  cart: CartState;
  user: {
    isLoading: boolean;
    isAuth: boolean;
    user: User | null;
  };
}

const MiniCart = ({ cart, user }: Props) => {
  return (
    <Popover alignRight buttonComponent={MiniCartButton} mouseDelay={0}>
      <div className={styles.contentWrap}>
        {cart &&
          cart.products &&
          cart.products.length > 0 &&
          cart.products.map((product: ProductInCart) => (
            <div className={`media ${styles.itemWrap}`}>
              <div className="media-left">
                <figure
                  className={`image is-48x48 ${styles.image}`}
                  style={{ backgroundImage: `url(${product.image.url})` }}
                ></figure>
              </div>
              <div className="media-content">
                <p className="title is-6">{product.productName}</p>
                <span>
                  {product.price * product.quantity} {CURRENCY}
                </span>
              </div>
            </div>
          ))}
        <p>
          Summary: {getTotalPrice(cart.products)} {CURRENCY}
        </p>
      </div>
    </Popover>
  );
};

export default MiniCart;
