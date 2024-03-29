import ContentfulService from 'services/ContentfulService';
import { AppDispatch, AppThunk } from 'redux/store';
import { mapCategories } from './UI.helpers';
import { UIActions } from './UI.reducer';

export const fetchCategories = (): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(UIActions.fetchCategoriesBegin());

    const categories = await ContentfulService.getCategories();
    const mappedCategories = mapCategories(categories);

    dispatch(UIActions.fetchCategoriesSuccess(mappedCategories));
  } catch (err) {
    console.error(err);
    dispatch(UIActions.fetchCategoriesError(err.message));
  }
};  