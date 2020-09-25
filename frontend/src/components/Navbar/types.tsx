export interface INavCategory {
  id: string;
  categoryTree: string;
  displayName: string;
  subcategories?: {
    id: string;
    categoryTree: string;
    displayName: string;
  }[];
}

export interface INavCategories {
  [key: string]: INavCategory;
}
