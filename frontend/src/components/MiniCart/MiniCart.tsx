import React, { MouseEvent, useEffect, useState } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames/bind';

import { CartState } from 'redux/Cart/cart.reducer';

import Popover from 'common/components/Popover/Popover';
import ButtonIcon from 'common/components/ButtonIcon/ButtonIcon';

import { ProductInCart, User } from 'common/types';
import { getTotalPrice } from 'common/helpers';

import styles from './MiniCart.module.scss';
import { BaseConfig } from 'common/config';
import { forceDoubleToggle } from 'common/helpers/state';
import { getTotalProductsCount } from 'common/helpers/cart';

const cn = cx.bind(styles);

const { CURRENCY } = BaseConfig;

interface ButtonProps {
  itemsInCart: number;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const MiniCartButton = ({ onClick, itemsInCart }: ButtonProps) => {
  const [prevCount, setPrevCount] = useState(0);
  const [isAnimated, setIsAnimated] = useState(true);

  useEffect(() => {
    if (itemsInCart !== prevCount) {
      setPrevCount(itemsInCart);
      forceDoubleToggle(setIsAnimated, isAnimated);
    }
  }, [itemsInCart, isAnimated, prevCount]);

  const getCounterText = (count: number) => {
    if (count > 99) return '99+';

    return count;
  };

  const wrapperClassName = cn('iconWrap', {
    isBigger: itemsInCart > 99,
  });

  return (
    <div className={wrapperClassName}>
      <ButtonIcon
        isFullwidth
        icon={faShoppingCart}
        isTransparent
        onClick={onClick}
        className="no-margin-icon"
      >
        {itemsInCart !== 0 && (
          <div
            className={cn('counter', {
              withAnimation: isAnimated,
            })}
          >
            {getCounterText(itemsInCart)}
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
    <Popover
      alignRight
      buttonComponent={({ onClick }) => (
        <MiniCartButton
          onClick={onClick}
          itemsInCart={getTotalProductsCount(cart.products)}
        />
      )}
      mouseDelay={0}
    >
      <div className={styles.contentWrap}>
        {cart.products.length > 0 ? (
          cart.products.map((product: ProductInCart) => (
            <div key={product.id} className={`media ${styles.itemWrap}`}>
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
