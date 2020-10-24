import React, { FC, MouseEvent } from 'react';
import cn from 'classnames';
import { Colors } from 'common/types';
import {
  faLongArrowAltRight,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  isTransparent?: boolean;
  isFullwidth?: boolean;
  variant?: Colors;
  icon?: IconDefinition;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ButtonIcon: FC<Props> = ({
  isFullwidth,
  isTransparent,
  variant = Colors.Primary,
  icon = faLongArrowAltRight,
  onClick,
  children,
}) => {
  const ButtonClassName = cn(
    'button',
    !isTransparent ? variant : null,
    'is-rounded',
    {
      'reset-button': isTransparent,
      'is-fullwidth': isFullwidth,
    }
  );

  return (
    <button className={ButtonClassName} onClick={onClick}>
      {children && <span>{children}</span>}
      <span className="icon">
        <FontAwesomeIcon icon={icon} />
      </span>
    </button>
  );
};

export default ButtonIcon;
