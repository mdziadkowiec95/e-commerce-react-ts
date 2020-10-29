import React, { MouseEvent, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';
import { ActiveMenus, UICategoriesState } from 'redux/UI/UI.reducer';
import { NavCategory } from 'common/types';
import UserMenu from 'components/UserMenu/UserMenu';
import { User } from 'common/types/user';
import { useBreakpoint, useClickOutside } from 'hooks';
import MiniCartContainer from 'containers/MiniCartContainer';
import NavCategoryDropdown from './NavCategoryDropdown';
import styles from './Navbar.module.scss';
import { MiniCartButton } from 'components/MiniCart/MiniCart';

interface Props {
  categories: UICategoriesState;
  activeMenus: ActiveMenus;
  user: {
    isAuth: boolean;
    isLoading: boolean;
    user: User | null;
  };
  cart: {
    productsTotalCount: number;
  };
  logoutUser: () => Promise<void> | void;
  toggleNavMenu: (isOpen: boolean) => void;
  toggleUserMenu: (isOpen: boolean) => void;
}

const Navbar = ({
  categories,
  activeMenus,
  toggleNavMenu,
  toggleUserMenu,
  user,
  logoutUser,
  cart,
}: Props) => {
  const history = useHistory();
  const { isMinScreen } = useBreakpoint(300);

  const close = useCallback(() => {
    if (activeMenus.nav) toggleNavMenu(false);
  }, [activeMenus.nav, toggleNavMenu]);

  const containerRef = useClickOutside<HTMLElement>(close);

  const renderNavCategories = (categoriesState: UICategoriesState) => {
    const navCategories = categoriesState.data;

    return (
      navCategories &&
      Object.values(navCategories).map((category: NavCategory) => (
        <NavCategoryDropdown key={category.id} category={category} />
      ))
    );
  };

  return (
    <nav
      ref={containerRef}
      className={cn('navbar', styles.nav)}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt="Some alt"
          />
        </Link>

        {!isMinScreen.isDesktop && (
          <>
            <div className={cn('navbar-item', styles.cartMobileIcon)}>
              <MiniCartButton
                onClick={() => {
                  history.push('/cart');
                }}
                productsTotalCount={cart.productsTotalCount}
                id="CartButtonIconMobile"
              />
            </div>
            <div className="navbar-item px-0">
              <UserMenu
                isActive={activeMenus.user}
                toggleIsActive={toggleUserMenu}
                isAuth={user.isAuth}
                isLoading={user.isLoading}
                user={user.user}
                onLogout={logoutUser}
              />
            </div>
          </>
        )}

        <Link
          role="button"
          className={cn('navbar-burger', 'burger', {
            'is-active': activeMenus.nav,
          })}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={(e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            toggleNavMenu(!activeMenus.nav);
          }}
          to="/"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Link>
      </div>

      <div
        id="navbar"
        className={cn('navbar-menu', { 'is-active': activeMenus.nav })}
      >
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          {renderNavCategories(categories)}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {isMinScreen.isDesktop && <MiniCartContainer />}
              {isMinScreen.isDesktop && (
                <UserMenu
                  isActive={activeMenus.user}
                  toggleIsActive={toggleUserMenu}
                  isAuth={user.isAuth}
                  isLoading={user.isLoading}
                  user={user.user}
                  onLogout={logoutUser}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
