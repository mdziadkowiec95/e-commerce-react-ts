import React, { ElementType, FC, MouseEvent, useCallback } from 'react';

import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {
  useClickOutside,
  useEscape,
  useMouseLeaveDelay,
  useToggle,
} from 'hooks';

interface DefaultButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const DefaultButtonComponent = ({ onClick }: DefaultButtonProps) => (
  <button
    className="button reset-button"
    aria-haspopup="true"
    aria-controls="dropdown-menu4"
    onClick={onClick}
  >
    <FontAwesomeIcon icon={faCaretDown} />
  </button>
);

interface Props {
  alignRight?: boolean;
  mouseDelay?: number;
  buttonComponent?: ElementType;
  buttonProps?: { [k: string]: any };
}

const Popover: FC<Props> = ({
  children,
  alignRight = false,
  mouseDelay = 500,
  buttonComponent: ButtonComponent = DefaultButtonComponent, // A component to be rendered as Popover's button
  buttonProps, // You can use this prop if you need to pass some props to the button component
}) => {
  // A flag which indicates whether the component has been opened using click/keyboard events (not mouseenter/mouseleave)
  const [isClicked, setIsClicked] = useToggle();

  // A flag which indicates whether the component is active (visible). All applied events.
  const [isActive, toggleIsActive] = useToggle();

  const close = useCallback(() => {
    setIsClicked(false);
    toggleIsActive(false);
  }, [toggleIsActive, setIsClicked]);
  const containerRef = useClickOutside<HTMLDivElement>(close);

  // Add functionality to close on Escape key
  useEscape(close);

  const handleUserButtonIconClick = (): void => {
    setIsClicked(true);
    toggleIsActive(true);
  };

  const {
    createMouseEnterHandler,
    createMouseLeaveHandler,
  } = useMouseLeaveDelay(mouseDelay);

  const handleMouseEnter = createMouseEnterHandler(() => toggleIsActive(true));
  const handleMouseLeave = createMouseLeaveHandler(() => {
    if (!isClicked) toggleIsActive(false);
  });

  const dropdownClassName = cn('dropdown', 'is-hoverable', {
    'is-right': alignRight,
    'is-active': isActive,
  });

  return (
    <div
      className={dropdownClassName}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="dropdown-trigger">
        <ButtonComponent onClick={handleUserButtonIconClick} {...buttonProps} />

        <div className="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item has-text-centered">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popover;
