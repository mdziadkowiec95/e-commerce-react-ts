import { createClient, ContentfulClientApi } from 'contentful';
import {
  Category,
  CategoryBase,
  CategoryEntry,
  CategoryCollection,
} from '../common/types/categories';
import {
  ProductBase,
  ProductEntry,
  ProductsCollection,
  ProductsCollectionMap,
} from '../common/types/product';
import { getEnvironementVariable } from '../helpers/environment';

export const getCategoryQuery = (
  parentCategory?: string,
  subCategory?: string
): string => {
  let query = '';

  if (parentCategory) {
    query += parentCategory;
  }

  if (subCategory) {
    query += parentCategory ? `/${subCategory}` : subCategory;
  }

  return query;
};

export const getOptionsForCategory = (
  parentCategory?: string,
  subCategory?: string
): { [key: string]: string } => {
  const query = getCategoryQuery(parentCategory, subCategory);
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

  return options;
};
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
          return res.items
            ? res.items.map(
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
              )
            : [];
        });
    },

    async getProducts(
      parentCategory?: string,
      subCategory?: string
    ): Promise<ProductsCollectionMap> {
      const categoryOptions = getOptionsForCategory(
        parentCategory,
        subCategory
      );
      return client
        .getEntries<ProductBase>({
          content_type: 'product',
          ...categoryOptions,
        })
        .then(
          ({
            limit,
            skip,
            total,
            items,
          }: ProductsCollection): ProductsCollectionMap => ({
            limit,
            skip,
            total,
            items: items.map((product: ProductEntry) => ({
              id: product.sys.id,
              ...product.fields,
            })),
          })
        );
    },
  };
};

const contentfulClient: ContentfulClientApi = createClient({
  space: getEnvironementVariable('REACT_APP_CONTENTFUL_SPACE_ID'),
  environment: 'master',
  accessToken: getEnvironementVariable('REACT_APP_CONTENTFUL_ACCESS_TOKEN'),
});

export default ContentfulServiceFactory(contentfulClient);
