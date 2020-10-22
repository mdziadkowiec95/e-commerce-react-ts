import React, { MouseEvent, RefObject, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavCategory } from '../../common/types/categories';
import { useToggle } from '../../hooks/useToggle';
import cn from 'classnames';
import { useClickOutside } from '../../hooks/useClickOutside';

interface Props {
  category: NavCategory | undefined;
}

const NavCategoryDropdown = ({ category }: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useToggle();
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const handleDropdownClick = () => {
    setIsActive(!isActive);

    if (dropdownRef && dropdownRef.current) {
      const el = dropdownRef.current;

      if (!isActive) {
        setDropdownHeight(el.scrollHeight);
      } else {
        setDropdownHeight(0);
      }
    }
  };
  const containerRef = useClickOutside(() => {
    setIsActive(false);
    setDropdownHeight(0);
  });

  return category ? (
    <div
      className={cn('navbar-item', 'has-dropdown', 'is-hoverable', {
        'is-active': isActive,
      })}
      data-testid="nav-category-dropdown"
      onClick={handleDropdownClick}
      ref={containerRef as RefObject<HTMLDivElement>}
    >
      <a href="#" className="navbar-link" onClick={void 0}>
        {category.displayName}
      </a>

      <div
        style={{ height: `${dropdownHeight}px` }}
        className="navbar-dropdown"
        data-testid="nav-subcategories-wrap"
        ref={dropdownRef}
      >
        {category.subcategories?.map((subcategory: NavCategory) => (
          <Link
            key={subcategory.id}
            className="navbar-item"
            to={`/products/${subcategory.categoryTree}`}
          >
            {subcategory.displayName}
          </Link>
        ))}
        <hr className="navbar-divider" />
        <Link className="navbar-item" to="/products">
          All {category.displayName.toLowerCase()}
        </Link>
      </div>
    </div>
  ) : null;
};

export default NavCategoryDropdown;
