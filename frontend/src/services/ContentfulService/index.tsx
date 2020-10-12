import { createClient, ContentfulClientApi } from 'contentful';
import {
  Category,
  CategoryBase,
  CategoryEntry,
  CategoryCollection,
} from '../../common/types/categories';
import {
  ProductBase,
  ProductEntry,
  ProductsCollection,
  ProductsCollectionMap,
} from '../../common/types/product';
import { getEnvironementVariable } from '../../helpers/environment';
import { getOptionsForCategory } from './queryHelpers';

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
            items: items.map((product: ProductEntry) => {
              const {
                productName,
                slug,
                productDescription,
                image,
                category,
                sku,
                price,
                quantity,
              } = product.fields;

              return {
                id: product.sys.id,
                productName,
                slug,
                productDescription,
                image,
                category,
                sku,
                price,
                quantity,
              };
            }),
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
