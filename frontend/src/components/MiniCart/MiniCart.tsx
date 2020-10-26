import React, { MouseEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cx from 'classnames/bind';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { CartState } from 'redux/Cart/cart.reducer';

import { BaseConfig } from 'common/config';
import { ProductInCart, User } from 'common/types';
import { Device, getTotalPrice } from 'common/helpers';

import ButtonIcon from 'common/components/ButtonIcon/ButtonIcon';

import styles from './MiniCart.module.scss';

const cn = cx.bind(styles);

const { CURRENCY } = BaseConfig;

interface ButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  productsInCart: any;
}

export const MiniCartButton = ({ onClick, productsInCart }: ButtonProps) => {
  const history = useHistory();
  const [prevCount, setPrevCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (productsInCart !== prevCount) {
      setPrevCount(productsInCart);
      setIsAnimating(true);
    }
  }, [productsInCart, isAnimating, prevCount]);

  const getCounterText = (count: number) => {
    if (count > 99) return '99+';

    return count;
  };

  const wrapperClassName = cn('iconWrap', {
    isBigger: productsInCart > 99,
  });

  return (
    <div className={wrapperClassName}>
      <ButtonIcon
        isFullwidth
        icon={faShoppingCart}
        isTransparent
        onClick={(e) => {
          if (!Device.isMin().isDesktop()) {
            history.push('/cart');
          }
          onClick(e);
        }}
        className="no-margin-icon"
      >
        {productsInCart !== 0 && (
          <div
            className={cn('counter', {
              withAnimation: isAnimating,
            })}
            onAnimationEnd={() => setIsAnimating(false)}
          >
            {getCounterText(productsInCart)}
          </div>
        )}
      </ButtonIcon>
    </div>
  );
};

interface MiniCartProps {
  cart: CartState;
  user: {
    isLoading: boolean;
    isAuth: boolean;
    user: User | null;
  };
}

const MiniCart = ({ cart, user }: MiniCartProps) => {
  return (
    <div className={styles.contentWrap}>
      {cart.products.length > 0 ? (
        cart.products.map((product: ProductInCart) => (
          <div key={product.id} className={`media ${styles.product}`}>
            <div className="media-left">
              <figure
                className={`image is-48x48 ${styles.image}`}
                style={{ backgroundImage: `url(${product.image.url})` }}
              ></figure>
            </div>
            <div className={`media-content ${styles.productContent}`}>
              <Link to={`/product/${product.slug}`} className="title is-6 mb-0">
                {product.productName} <span>({product.quantity})</span>
              </Link>
              <span className={styles.productPrice}>
                {product.price * product.quantity} {CURRENCY}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="title is-6">You don't have any products in cart.</p>
      )}
      <p>
        Summary: {getTotalPrice(cart.products)} {CURRENCY}
      </p>
    </div>
  );
};

export default MiniCart;
