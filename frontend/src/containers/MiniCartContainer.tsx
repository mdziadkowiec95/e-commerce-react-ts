import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import MiniCart, { MiniCartButton } from 'components/MiniCart/MiniCart';

import { RootState } from 'redux/rootReducer';
import * as fromCart from 'redux/Cart/cart.selectors';

import Popover from 'common/components/Popover/Popover';
import { useBreakpoint } from 'hooks';

const MiniCartContainer = () => {
  const cartState = useSelector(
    (state: RootState) => ({
      isLoading: fromCart.getIsLoading(state),
      products: fromCart.getProducts(state),
      productsTotalCount: fromCart.getProductsTotalQuantity(state),
    }),
    shallowEqual
  );

  const { isMinScreen } = useBreakpoint();

  return (
    <Popover
      alignRight
      isHoverable={false}
      buttonComponent={MiniCartButton}
      buttonProps={{
        productsTotalCount: cartState.productsTotalCount,
      }}
      onButtonClick={() => {
        console.log('Dispatch hide Navbar');
      }}
      mouseDelay={200}
      id="MiniCartDropdown"
      disabled={!isMinScreen.isDesktop}
    >
      {(closePopover) => (
        <MiniCart cart={cartState} onNavigateToProduct={closePopover} />
      )}
    </Popover>
  );
};

export default MiniCartContainer;
