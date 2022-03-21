import { faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import React, { RefObject, useCallback } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { User } from 'common/types/user';
import UserAvatar from './UserAvatar';
import SignInContainer from 'containers/SignInContainer';
import {
  useClickOutside,
  useEscape,
  useToggle,
  useMouseLeaveDelay,
} from 'hooks';

import ButtonIcon, {
  ButtonIconSize,
} from 'common/components/ButtonIcon/ButtonIcon';

import './UserMenu.scss';
import { isMinBreakpoint } from 'common/helpers';
import { Breakpoint } from 'common/types';

interface Props {
  isActive: boolean;
  isAuth: boolean;
  isLoading: boolean;
  user: User | null;
  onLogout: () => Promise<void> | void;
  toggleIsActive: (isActive: boolean) => void;
}

const UserMenu = ({
  isActive,
  isLoading,
  isAuth,
  user,
  onLogout,
  toggleIsActive,
}: Props) => {
  // A flag which indicates whether the component has been opened using click/keyboard events (not mouseenter/mouseleave)
  const [isClicked, setIsClicked] = useToggle();

  const close = useCallback(() => {
    setIsClicked(false);
    if (isActive) toggleIsActive(false);
  }, [isActive, toggleIsActive, setIsClicked]);

  const containerRef = useClickOutside(close);

  useEscape(close);

  const handleUserButtonIconClick = (): void => {
    setIsClicked(true);
    toggleIsActive(true);
  };

  const {
    createMouseEnterHandler,
    createMouseLeaveHandler,
  } = useMouseLeaveDelay(0);

  const handleMouseEnter = createMouseEnterHandler(() => {
    if (!isAuth && isMinBreakpoint(Breakpoint.Desktop)) toggleIsActive(true);
  });
  const handleMouseLeave = createMouseLeaveHandler(() => {
    if (!isAuth && !isClicked && isMinBreakpoint(Breakpoint.Desktop))
      toggleIsActive(false);
  });

  const dropdownClassName = cn(
    'dropdown',
    'user-menu',
    // 'is-hoverable',
    'is-right',
    {
      'is-active': isActive,
    }
  );

  return (
    <div
      className={dropdownClassName}
      ref={containerRef as RefObject<HTMLDivElement>}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="dropdown-trigger">
        {!isLoading && !isAuth ? (
          <ButtonIcon
            isFullwidth
            icon={faUser}
            isTransparent
            onClick={handleUserButtonIconClick}
          ></ButtonIcon>
        ) : (
          <button
            className="button reset-button"
            aria-haspopup="true"
            aria-controls="dropdown-menu4"
            onClick={handleUserButtonIconClick}
          >
            <span className="icon is-small">
              <UserAvatar
                firstName={user?.firstName}
                lastName={user?.lastName}
              />
            </span>
          </button>
        )}
      </div>

      {!isLoading ? (
        !isAuth ? (
          <div
            className="dropdown-menu non-auth-menu"
            id="dropdown-menu4"
            role="menu"
          >
            <div className="dropdown-content">
              <ButtonIcon
                icon={faArrowRight}
                size={ButtonIconSize.Large}
                isTransparent
                onClick={close}
                className="close-button non-auth"
              ></ButtonIcon>
              <div className={cn('dropdown-item', 'has-text-centered')}>
                <SignInContainer />

                <p className="mb-2">Don't have acoount yet?</p>

                <Link
                  to="/register"
                  className="is-primary is-rounded is-fullwidth"
                >
                  <strong>Sign up</strong>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="box auth-menu">
            <ButtonIcon
              icon={faArrowRight}
              size={ButtonIconSize.Large}
              onClick={() => toggleIsActive(false)}
              isTransparent
              className="close-button auth"
            />

            <button onClick={onLogout} className="button is-light">
              Log out
            </button>
          </div>
        )
      ) : null}
    </div>
  );
};

export default UserMenu;
