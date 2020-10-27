import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import MiniCart, { MiniCartButton } from 'components/MiniCart/MiniCart';
import { RootState } from 'redux/rootReducer';
import Popover from 'common/components/Popover/Popover';
import * as fromCart from 'redux/Cart/cart.selectors';

const MiniCartContainer = () => {
  const cartState = useSelector(
    (state: RootState) => ({
      isLoading: fromCart.getIsLoading(state),
      products: fromCart.getProducts(state),
      productsTotalCount: fromCart.getProductsTotalQuantity(state),
    }),
    shallowEqual
  );

  return (
    <Popover
      alignRight
      buttonComponent={MiniCartButton}
      buttonProps={{
        productsTotalCount: cartState.productsTotalCount,
      }}
      mouseDelay={200}
    >
      <MiniCart cart={cartState} />
    </Popover>
  );
};

export default MiniCartContainer;
