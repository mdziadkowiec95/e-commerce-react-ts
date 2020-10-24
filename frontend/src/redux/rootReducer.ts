import { combineReducers } from 'redux';
import uiReducer from 'redux/UI/UI.reducer';
import userReducer from 'redux/User/user.reducer';
import notificationsReducer from 'redux/Notifications/notifications.reducer';
import productsReducer from 'redux/Products/products.reducer';
import cartReducer from 'redux/Cart/cart.reducer';

export enum ReducerName {
  UI = 'UI',
  User = 'user',
  Notifications = 'notifications',
  Products = 'products'
}

const rootReducer = combineReducers({
  UI: uiReducer,
  user: userReducer,
  notifications: notificationsReducer,
  products: productsReducer,
  cart: cartReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
