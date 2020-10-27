import React, { FC, MouseEvent } from 'react';
import cn from 'classnames';
import { Colors } from 'common/types';
import {
  faLongArrowAltRight,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export enum ButtonIconSize {
  Small = 'is-small',
  Normal = 'is-normal',
  Medium = 'is-medium',
  Large = 'is-large'
}

export interface ButtonIconProps {
  size?: ButtonIconSize;
  isTransparent?: boolean;
  isFullwidth?: boolean;
  variant?: Colors;
  noMarginIcon?: boolean;
  icon?: IconDefinition;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const getIconSize = (size: ButtonIconSize) => {
  switch(size) {
    case ButtonIconSize.Small:
      return 'md';
    case ButtonIconSize.Medium:
      return 'md';
    case ButtonIconSize.Large:
      return 'lg';
    default: 
      return null;
  }
}

const ButtonIcon: FC<ButtonIconProps> = ({
  size = ButtonIconSize.Normal,
  isFullwidth,
  isTransparent,
  variant = Colors.Primary,
  icon = faLongArrowAltRight,
  noMarginIcon,
  className,
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
    <button className={ButtonClassName} onClick={onClick}>
      {children && <span>{children}</span>}
      <span className="icon">
        <FontAwesomeIcon icon={icon} size={getIconSize(size)} />
      </span>
    </button>
  );
};

export default ButtonIcon;
