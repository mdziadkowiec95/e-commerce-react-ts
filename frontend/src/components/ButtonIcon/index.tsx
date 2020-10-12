import React, { FC, MouseEvent } from 'react';
import cn from 'classnames';
import { Colors } from '../../common/types/bulma';
import {
  faLongArrowAltRight,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  isFullwidth?: boolean;
  variant?: Colors;
  icon?: IconDefinition;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ButtonIcon: FC<Props> = ({
  isFullwidth,
  variant = Colors.Primary,
  icon = faLongArrowAltRight,
  onClick,
  children,
}) => {
  const ButtonClassName = cn('button', variant, 'is-rounded', {
    'is-fullwidth': isFullwidth,
  });

  return (
    <button className={ButtonClassName} onClick={onClick}>
      <span>{children}</span>
      <span className="icon">
        <FontAwesomeIcon icon={icon} />
      </span>
    </button>
  );
};

export default ButtonIcon;
