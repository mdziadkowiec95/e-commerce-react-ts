import { createClient, ContentfulClientApi } from 'contentful';
import {
  CategoriesCollection,
  CategoryEntry,
} from '../common/types/categories';
import { getEnvironementVariable } from '../helpers/environment';

const contentfulClient: ContentfulClientApi = createClient({
  space: getEnvironementVariable('REACT_APP_CONTENTFUL_SPACE_ID'),
  environment: 'master',
  accessToken: getEnvironementVariable('REACT_APP_CONTENTFUL_ACCESS_TOKEN'),
});

function mapPromise<T>(promise: Promise<any>, cb: Function): Promise<T> {
  return new Promise((resolve, reject) => {
    promise.then((res) => resolve(cb(res))).catch(reject);
  });
}

export const ContentfulServiceFactory = (client: ContentfulClientApi) => {
  return {
    getCategories(): Promise<CategoryEntry[]> {
      return mapPromise<CategoryEntry[]>(
        client.getEntries({
          content_type: 'category',
        }),
        (res: CategoriesCollection) => {
          return res.items.map((item: CategoryEntry) => {
            const {
              displayName,
              categoryTree,
              parentCategory,
              categoryDescription,
            } = item.fields;

            return {
              sys: { id: item.sys.id },
              fields: {
                displayName,
                categoryTree,
                categoryDescription,
                parentCategory,
              },
            };
          });
        }
      );
    },

    getProducts(parentCategory: string, subCategory: string): Promise<any> {
      let query = '';

      if (parentCategory) {
        query += parentCategory;
      }

      if (subCategory) {
        query += parentCategory ? `/${subCategory}` : subCategory;
      }

      let options: { [key: string]: string } = {};

      if (subCategory && parentCategory) {
        options = {
          'fields.category.sys.contentType.sys.id': 'category',
          'fields.category.fields.categoryTree': query,
        };
      } else if (parentCategory && !subCategory) {
        options = {
          'fields.rootCategory.sys.contentType.sys.id': 'category',
          'fields.rootCategory.fields.categoryTree': query,
        };
      }

      return client.getEntries({
        content_type: 'product',
        ...options,
      });
    },
  };
};

export default ContentfulServiceFactory(contentfulClient);
