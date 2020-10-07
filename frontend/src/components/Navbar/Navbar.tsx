import React from 'react';
import { Link } from 'react-router-dom';
import NavCategoryDropdown from './NavCategoryDropdown';
import { UICategoriesState } from '../../redux/UI/UI.reducer';
import { NavCategory } from '../../common/types/categories';
import UserMenu from '../UserMenu';
import { User } from '../../common/types/user';

interface Props {
  categories: UICategoriesState;
  user: {
    isAuth: boolean;
    isLoading: boolean;
    user: User | null;
  };
}

const Navbar = ({ categories, user }: Props) => {
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
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt="Some alt"
          />
        </Link>

        <Link
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={(e) => e.preventDefault()}
          to="/"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Link>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          {renderNavCategories(categories)}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <UserMenu
                isAuth={user.isAuth}
                isLoading={user.isLoading}
                user={user.user}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
