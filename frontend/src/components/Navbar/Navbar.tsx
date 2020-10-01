import React from 'react';
import { Link } from 'react-router-dom';
import NavCategoryDropdown from './NavCategoryDropdown';
import { UICategoriesState } from '../../redux/UI/UI.reducer';
import { NavCategory } from '../../common/types/categories';

interface Props {
  categories: UICategoriesState;
}

const Navbar = ({ categories }: Props) => {
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
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt="Some alt"
          />
        </a>

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
              <Link to="/register" className="button is-primary">
                <strong>Sign up</strong>
              </Link>
              <button className="button is-light">Log in</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
