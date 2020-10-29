import React, { MouseEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import cn from 'classnames';
import { UICategoriesState } from 'redux/UI/UI.reducer';
import { NavCategory } from 'common/types';
import UserMenu from 'components/UserMenu/UserMenu';
import { User } from 'common/types/user';
import { useBreakpoint, useToggle } from 'hooks';
import MiniCartContainer from 'containers/MiniCartContainer';
import NavCategoryDropdown from './NavCategoryDropdown';
import styles from './Navbar.module.scss';
import { MiniCartButton } from 'components/MiniCart/MiniCart';

interface Props {
  categories: UICategoriesState;
  user: {
    isAuth: boolean;
    isLoading: boolean;
    user: User | null;
  };
  cart: {
    productsTotalCount: number;
  };
  logoutUser: () => Promise<void> | void;
}

const Navbar = ({ categories, user, logoutUser, cart }: Props) => {
  const [isOpen, setIsOpen] = useToggle();
  const history = useHistory();
  const { isMinScreen } = useBreakpoint();

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
          <div className={cn('navbar-item', styles.cartMobileIcon)}>
            <MiniCartButton
              onClick={() => {
                history.push('/cart');
              }}
              productsTotalCount={cart.productsTotalCount}
              id="CartButtonIconMobile"
            />
          </div>
        )}

        <Link
          role="button"
          className={cn('navbar-burger', 'burger', {
            'is-active': isOpen,
          })}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={(e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          to="/"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Link>
      </div>

      <div id="navbar" className={cn('navbar-menu', { 'is-active': isOpen })}>
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
              <UserMenu
                isAuth={user.isAuth}
                isLoading={user.isLoading}
                user={user.user}
                onLogout={logoutUser}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
