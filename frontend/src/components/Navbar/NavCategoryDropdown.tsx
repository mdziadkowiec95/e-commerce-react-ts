import React from "react";
import { Link } from "react-router-dom";
import { INavCategory } from "./types";

interface Props {
  category: INavCategory;
}

const NavCategoryDropdown = ({ category }: Props) =>
  category ? (
    <div className="navbar-item has-dropdown is-hoverable">
      <Link className="navbar-link" to={`/products/${category.categoryTree}`}>
        {category.displayName}
      </Link>

      <div className="navbar-dropdown">
        {category.subcategories?.map((subcategory: any) => (
          <Link
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
