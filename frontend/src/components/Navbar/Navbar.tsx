import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryEntry } from "../../common/types/categories";
import ContentfulService from "../../services/ContentfulService";
import NavCategoryDropdown from "./NavCategoryDropdown";
import { INavCategories, INavCategory } from './types'; 

const mapCategoryData = (category: CategoryEntry): INavCategory => {
    const { categoryTree, displayName } = category.fields;
    const { id } = category.sys;
  
    return {
      id,
      categoryTree,
      displayName,
    };
  };

const Navbar = () => {
  const [navCategories, setNavCategories] = useState<INavCategories>({});

  const getNavCategories = (categories: CategoryEntry[]): INavCategories => {    
    return categories.reduce(
      (result: INavCategories, category: CategoryEntry): INavCategories => {
        const { parentCategory, categoryTree } = category.fields;

        if (!categoryTree) return result;

        if (!parentCategory) {
          if (result[categoryTree]) {
            return result;
          } else {
            return {
              ...result,
              [categoryTree]: {
                ...mapCategoryData(category),
                subcategories: [],
              },
            };
          }
        } else {
          const parentCategoryFieldName = parentCategory.fields.categoryTree;

          if (result[parentCategoryFieldName]) {
            result[parentCategoryFieldName].subcategories?.push(
              mapCategoryData(category)
            );
            return result;
          } else {
            return {
              ...result,
              [`${parentCategoryFieldName}`]: {
                ...mapCategoryData(parentCategory),
                subcategories: [mapCategoryData(category)],
              },
            };
          }
        }
      },
      {}
    );
  };

  useEffect(() => {
    ContentfulService.getCategories()
      .then((items: CategoryEntry[]) => {
        const categories = getNavCategories(items);
        setNavCategories(categories);

        console.log(categories);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  const renderNavCategories = () => {
    return navCategories && Object.values(navCategories).map((category: INavCategory) => <NavCategoryDropdown category={category} />)
  }

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

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={(e) => e.preventDefault()}
          href="#"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/"className="navbar-item">Home</Link>
          {renderNavCategories()}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
