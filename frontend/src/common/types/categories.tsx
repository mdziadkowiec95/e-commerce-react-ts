import { ContentfulCollection, Entry } from "contentful";

export type CategoryEntry = Entry<{
    title: string;
    categoryTree: string,
    displayName: string;
    categoryDescription: string;
    parentCategory?: CategoryEntry
}>;

export type CategoriesCollection = ContentfulCollection<CategoryEntry>;