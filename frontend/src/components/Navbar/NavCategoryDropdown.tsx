import React from 'react';
import { Link } from 'react-router-dom';
import { NavCategory } from '../../common/types/categories';

interface Props {
  category: NavCategory | undefined;
}

const NavCategoryDropdown = ({ category }: Props) =>
  category ? (
    <div
      className="navbar-item has-dropdown is-hoverable"
      data-testid="nav-category-dropdown"
    >
      <Link className="navbar-link" to={`/products/${category.categoryTree}`}>
        {category.displayName}
      </Link>

      <div className="navbar-dropdown" data-testid="nav-subcategories-wrap">
        {category.subcategories?.map((subcategory: NavCategory) => (
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
