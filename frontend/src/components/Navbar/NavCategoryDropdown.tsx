import React from 'react';
import { Link } from 'react-router-dom';
import { NavCategory } from '../../common/types/categories';
import { useToggle } from '../../hooks/useToggle';
import cn from 'classnames';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useScrollHeight } from '../../hooks/useScrollHeight';

interface Props {
  category: NavCategory | undefined;
}

const NavCategoryDropdown = ({ category }: Props) => {
  const [isActive, setIsActive] = useToggle();
  const [dropdownHeight, dropdownRef] = useScrollHeight<HTMLDivElement>(
    isActive
  );

  const handleDropdownClick = () => {
    setIsActive(!isActive);
  };

  const containerRef = useClickOutside<HTMLDivElement>(() => {
    setIsActive(false);
  });

  return category ? (
    <div
      className={cn('navbar-item', 'has-dropdown', 'is-hoverable', {
        'is-active': isActive,
      })}
      data-testid="nav-category-dropdown"
      onClick={handleDropdownClick}
      ref={containerRef}
    >
      <Link
        to={`/products/${category.categoryTree}`}
        className="navbar-link"
        onClick={(e) => e.preventDefault()}
      >
        {category.displayName}
      </Link>

      <div
        style={{ height: `${dropdownHeight}px` }}
        className="navbar-dropdown"
        data-testid="nav-subcategories-wrap"
        ref={dropdownRef}
      >
        {category.subcategories && category.subcategories.length > 0 && (
          <>
            {category.subcategories.map((subcategory: NavCategory) => (
              <Link
                key={subcategory.id}
                className="navbar-item"
                to={`/products/${subcategory.categoryTree}`}
              >
                {subcategory.displayName}
              </Link>
            ))}
            <hr className="navbar-divider" />
            <Link
              className="navbar-item"
              to={`/products/${category.categoryTree}`}
            >
              Show all
            </Link>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default NavCategoryDropdown;
