import { createClient, ContentfulClientApi } from 'contentful';
import {
  Category,
  CategoryBase,
  CategoryEntry,
  CategoryCollection,
} from '../common/types/categories';
import { getEnvironementVariable } from '../helpers/environment';

export const ContentfulServiceFactory = (client: ContentfulClientApi) => {
  return {
    getClient(): ContentfulClientApi {
      return client;
    },
    async getCategories(): Promise<Category[]> {
      return client
        .getEntries<CategoryBase>({
          content_type: 'category',
        })
        .then((res: CategoryCollection): Category[] => {
          return res.items.map(
            (item: CategoryEntry): Category => {
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
            }
          );
        });
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

const contentfulClient: ContentfulClientApi = createClient({
  space: getEnvironementVariable('REACT_APP_CONTENTFUL_SPACE_ID'),
  environment: 'master',
  accessToken: getEnvironementVariable('REACT_APP_CONTENTFUL_ACCESS_TOKEN'),
});

export default ContentfulServiceFactory(contentfulClient);
