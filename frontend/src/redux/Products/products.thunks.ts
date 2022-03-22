import ContentfulService from 'services/ContentfulService';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContentfulError, ContentfulErrorResponse, ProductsCollectionMap } from 'common/types';

export const fetchProducts = createAsyncThunk<ProductsCollectionMap, {
  parentCategory?: string;
  subCategory?: string;
},
{
  rejectValue: ContentfulError
}>(
  'products/fetchProducts',
  async ({
    parentCategory,
    subCategory
  }, { rejectWithValue }) => {
    try {
      const products = await ContentfulService.getProducts(parentCategory, subCategory);

      return products;
    } catch (error) {
      // @TODO -> Create some global function to handle commno response format
      const err = error as ContentfulErrorResponse;

      if (!err.details) {
        return rejectWithValue({
          name: 'Unexpected error',
          value: err.message ? err.message : err as any
        })
      }

      const errorData = err.details.errors[0];

      return rejectWithValue(errorData);
    }
  }
)