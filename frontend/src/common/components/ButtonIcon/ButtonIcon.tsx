import React, { FC, MouseEvent } from 'react';
import cn from 'classnames';
import {
  faLongArrowAltRight,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Variant } from 'common/types';

export enum ButtonIconSize {
  Small = 'is-small',
  Normal = 'is-normal',
  Medium = 'is-medium',
  Large = 'is-large',
}

export interface ButtonIconProps {
  size?: ButtonIconSize;
  isTransparent?: boolean;
  isFullwidth?: boolean;
  variant?: Variant;
  noMarginIcon?: boolean;
  icon?: IconDefinition;
  className?: string;
  ariaHasPopup?: boolean;
  ariaControls?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const getIconSize = (size: ButtonIconSize) => {
  switch (size) {
    case ButtonIconSize.Small:
      return '1x';
    case ButtonIconSize.Medium:
      return '1x';
    case ButtonIconSize.Large:
      return 'lg';
    default:
      return;
  }
};

const ButtonIcon: FC<ButtonIconProps> = ({
  size = ButtonIconSize.Normal,
  isFullwidth,
  isTransparent,
  variant = Variant.Primary,
  icon = faLongArrowAltRight,
  noMarginIcon,
  className,
  ariaHasPopup = false,
  ariaControls,
  onClick,
  children,
}) => {
  const ButtonClassName = cn(
    'button',
    size,
    !isTransparent ? variant : null,
    'is-rounded',
    {
      'reset-button': isTransparent,
      'is-fullwidth': isFullwidth,
      'no-margin-icon': noMarginIcon,
    },
    className
  );

  return (
    <button
      className={ButtonClassName}
      aria-haspopup={ariaHasPopup}
      aria-controls={ariaControls}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      {children && <span>{children}</span>}
      <span className="icon">
        <FontAwesomeIcon icon={icon} size={getIconSize(size)} />
      </span>
    </button>
  );
};

export default ButtonIcon;
