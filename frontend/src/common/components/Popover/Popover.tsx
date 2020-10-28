import React, { ElementType, FC, MouseEvent, useCallback } from 'react';

import cn from 'classnames';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import {
  useClickOutside,
  useEscape,
  useMouseLeaveDelay,
  useToggle,
} from 'hooks';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

interface DefaultButtonProps {
  id: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const DefaultButtonComponent = ({ onClick, id }: DefaultButtonProps) => (
  <ButtonIcon
    icon={faCaretDown}
    onClick={onClick}
    ariaHasPopup
    ariaControls={id}
  />
);

interface Props {
  id: string;
  alignRight?: boolean;
  mouseDelay?: number;
  isHoverable?: boolean;
  buttonComponent?: ElementType;
  buttonProps?: { [k: string]: any };
  disabled?: boolean;
  onButtonClick?: () => void;
  children: ((fn: () => void) => JSX.Element) | JSX.Element;
}

const Popover: FC<Props> = ({
  children,
  id,
  alignRight = false,
  mouseDelay = 500,
  isHoverable = true,
  onButtonClick,
  disabled = false,
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

  const handleButtonIconClick = (): void => {
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

  const handleClosePopover = () => {
    toggleIsActive(false);
    setIsClicked(false);
  };

  const dropdownClassName = cn('dropdown', {
    'is-hoverable': isHoverable,
    'is-right': alignRight,
    'is-active': !disabled && isActive,
  });

  return (
    <div
      className={dropdownClassName}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="dropdown-trigger">
        <ButtonComponent
          onClick={() => {
            handleButtonIconClick();
            if (onButtonClick) onButtonClick();
          }}
          id={id}
          {...buttonProps}
        />

        <div className="dropdown-menu" role="menu" id={id}>
          <div className="dropdown-content">
            <div className="dropdown-item has-text-centered">
              {typeof children === 'function'
                ? children(handleClosePopover)
                : children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popover;
