import ContentfulService from 'services/ContentfulService';
import { AppThunk } from 'redux/store';
import { ProductsActions } from './products.reducer';

export const fetchProducts = (parentCategory?: string, subCategory?: string): AppThunk => async dispatch => {
  try {
    dispatch(ProductsActions.fetchProductsBegin());

    const products = await ContentfulService.getProducts(parentCategory, subCategory);

    dispatch(ProductsActions.fetchProductsSuccess(products));
  } catch (error) {

    console.error(error);
    dispatch(ProductsActions.fetchProductsError());
  }
};