import { faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

import ButtonIcon from 'common/components/ButtonIcon/ButtonIcon';

interface Props {
  isAuth: boolean;
  isLoading: boolean;
  user: User | null;
  onLogout: () => Promise<void> | void;
}

const UserMenu = ({ isLoading, isAuth, user, onLogout }: Props) => {
  // A flag which indicates whether the component has been opened using click/keyboard events (not mouseenter/mouseleave)
  const [isClicked, setIsClicked] = useToggle();

  // A flag which indicates whether the component is active (visible). All applied events.
  const [isActive, toggleIsActive] = useToggle();

  const close = useCallback(() => {
    setIsClicked(false);
    toggleIsActive(false);
  }, [toggleIsActive, setIsClicked]);
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

  const handleMouseEnter = createMouseEnterHandler(() => toggleIsActive(true));
  const handleMouseLeave = createMouseLeaveHandler(() => {
    if (!isClicked) toggleIsActive(false);
  });

  const dropdownClassName = cn('dropdown', 'is-hoverable', 'is-right', {
    'is-active': isActive,
  });

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
          <div className="dropdown-menu" id="dropdown-menu4" role="menu">
            <div className="dropdown-content">
              <div className="dropdown-item has-text-centered">
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
          <div
            className="box"
            style={{
              position: 'fixed',
              top: 0,
              right: isActive ? '0' : '-300px',
              // height: '100%',
              width: '300px',
              transition: 'all .25s ease-in-out',
            }}
          >
            <div style={{ position: 'relative', paddingTop: '50px' }}>
              <button
                className="reset-button is-clickable"
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                }}
                onClick={() => toggleIsActive(false)}
              >
                <FontAwesomeIcon icon={faArrowRight} size="2x" />
              </button>

              <button onClick={onLogout} className="button is-light">
                Log out
              </button>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default UserMenu;
