import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import React, { MouseEvent } from 'react';
import ButtonIcon from '../ButtonIcon';
import Popover from '../Popover';

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

const MiniCart = () => {
  return (
    <Popover alignRight buttonComponent={MiniCartButton}>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </Popover>
  );
};

export default MiniCart;
