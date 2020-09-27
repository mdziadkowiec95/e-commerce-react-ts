import { Entry, EntryCollection } from 'contentful';

export interface CategoryBase {
  title: string;
  categoryTree: string;
  displayName: string;
  categoryDescription: string;
  parentCategory?: Entry<CategoryBase>;
}

export interface Category {
  sys: { id: string };
  fields: {
    displayName: string;
    categoryTree: string;
    categoryDescription: string;
    parentCategory?: Entry<CategoryBase>;
  };
}

export type CategoryEntry = Entry<CategoryBase>;
export type CategoryCollection = EntryCollection<CategoryBase>;

export interface NavCategory {
  id: string;
  categoryTree: string;
  displayName: string;
  subcategories?: {
    id: string;
    categoryTree: string;
    displayName: string;
  }[];
}

export interface NavCategories {
  [key: string]: NavCategory;
}
