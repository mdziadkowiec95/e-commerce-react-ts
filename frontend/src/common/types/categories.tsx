import { ContentfulCollection, Entry } from 'contentful';

export type CategoryEntry = Entry<{
  title: string;
  categoryTree: string;
  displayName: string;
  categoryDescription: string;
  parentCategory?: CategoryEntry;
}>;

export type CategoriesCollection = ContentfulCollection<CategoryEntry>;

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
