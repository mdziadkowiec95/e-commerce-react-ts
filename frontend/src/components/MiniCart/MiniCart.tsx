import React, { MouseEvent, useEffect, useState } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames/bind';

import { CartState } from 'redux/Cart/cart.reducer';

import Popover from 'common/components/Popover/Popover';
import ButtonIcon from 'common/components/ButtonIcon/ButtonIcon';

import { ProductInCart, User } from 'common/types';

import { Device, getTotalPrice } from 'common/helpers';

import styles from './MiniCart.module.scss';
import { BaseConfig } from 'common/config';
import { getTotalProductsCount } from 'common/helpers/cart';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/rootReducer';

const cn = cx.bind(styles);

const { CURRENCY } = BaseConfig;

interface ButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const MiniCartButton = ({ onClick }: ButtonProps) => {
  const newCount = useSelector((state: RootState) =>
    getTotalProductsCount(state.cart.products)
  );
  const history = useHistory();
  const [prevCount, setPrevCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (newCount !== prevCount) {
      setPrevCount(newCount);
      setIsAnimating(true);
    }
  }, [newCount, isAnimating, prevCount]);

  const getCounterText = (count: number) => {
    if (count > 99) return '99+';

    return count;
  };

  const wrapperClassName = cn('iconWrap', {
    isBigger: newCount > 99,
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
        {newCount !== 0 && (
          <div
            className={cn('counter', {
              withAnimation: isAnimating,
            })}
            onAnimationEnd={() => {
              setIsAnimating(false);
            }}
          >
            {getCounterText(newCount)}
          </div>
        )}
      </ButtonIcon>
    </div>
  );
};

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
                <Link
                  to={`/product/${product.slug}`}
                  className="title is-6 mb-0"
                >
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
    </Popover>
  );
};

export default MiniCart;
