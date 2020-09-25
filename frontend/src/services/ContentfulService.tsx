import { createClient, ContentfulClientApi, ContentfulCollection, Entry } from "contentful";
import { getEnvironementVariable } from "../helpers/environment";

const contentfulClient: ContentfulClientApi = createClient({
  space: getEnvironementVariable("REACT_APP_CONTENTFUL_SPACE_ID"),
  environment: "master",
  accessToken: getEnvironementVariable("REACT_APP_CONTENTFUL_ACCESS_TOKEN"),
});

type CategoryEntry = Entry<{
    fieldName: string,
    title: string
}>;

type CategoriesCollection = ContentfulCollection<CategoryEntry>;

export const ContentfulServiceFactory = (client: ContentfulClientApi) => {
  return {
    getCategories(): Promise<CategoriesCollection> {
      return client.getEntries({
        content_type: "category",
      });
    },

    getProducts(parentCategory: string, subCategory: string): Promise<any> {
      let query = "";

      if (parentCategory) {
        query += parentCategory;
      }

      if (subCategory) {
        query += parentCategory ? `/${subCategory}` : subCategory;
      }

      let options: { [key: string]: string } = {};

      if (subCategory && parentCategory) {
        options = {
          "fields.category.sys.contentType.sys.id": "category",
          "fields.category.fields.fieldName": query,
        };
      } else if (parentCategory && !subCategory) {
        options = {
          "fields.rootCategory.sys.contentType.sys.id": "category",
          "fields.rootCategory.fields.fieldName": query,
        };
      }

      return client.getEntries({
        content_type: "product",
        ...options,
      });
    },
  };
};

export default ContentfulServiceFactory(contentfulClient);
