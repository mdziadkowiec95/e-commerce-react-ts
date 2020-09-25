import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { INavCategory } from './types';

interface Props {
  category: INavCategory | undefined;
}

const NavCategoryDropdown: FunctionComponent<Props> = ({ category }) =>
  category ? (
    <div
      className="navbar-item has-dropdown is-hoverable"
      data-testid="nav-category-dropdown"
    >
      <Link className="navbar-link" to={`/products/${category.categoryTree}`}>
        {category.displayName}
      </Link>

      <div className="navbar-dropdown" data-testid="nav-subcategories-wrap">
        {category.subcategories?.map((subcategory: INavCategory) => (
          <Link
            key={subcategory.id}
            className="navbar-item"
            to={`/products/${subcategory.categoryTree}`}
          >
            {subcategory.displayName}
          </Link>
        ))}
      </div>
    </div>
  ) : null;

export default NavCategoryDropdown;
