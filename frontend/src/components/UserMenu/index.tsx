import { faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { User } from '../../common/types/user';
import UserAvatar from './UserAvatar';
import SignInContainer from '../../containers/SignInContainer';

interface Props {
  isAuth: boolean;
  isLoading: boolean;
  user: User | null;
  onLogout: () => Promise<void> | void;
}

const UserMenu = ({ isLoading, isAuth, user, onLogout }: Props) => {
  const [isActive, setIsActive] = useState(false);

  const dropdownClassName = cn('dropdown', 'is-hoverable', 'is-right', {
    'is-active': isActive,
  });

  const handleUserButtonIconClick = (): void => {
    setIsActive(!isActive);
  };

  return (
    <div className={dropdownClassName}>
      <div className="dropdown-trigger">
        <button
          className="button reset-button"
          aria-haspopup="true"
          aria-controls="dropdown-menu4"
          onClick={handleUserButtonIconClick}
        >
          <span className="icon is-small">
            {!isLoading && !isAuth ? (
              <FontAwesomeIcon icon={faUser} />
            ) : (
              <UserAvatar
                firstName={user?.firstName}
                lastName={user?.lastName}
              />
            )}
          </span>
        </button>
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
                onClick={() => setIsActive(false)}
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
