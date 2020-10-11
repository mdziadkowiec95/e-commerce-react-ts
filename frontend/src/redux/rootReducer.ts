import { combineReducers } from 'redux';
import uiReducer from './UI/UI.reducer';
import userReducer from './User/user.reducer';
import notificationsReducer from './Notifications/notifications.reducer';
import productsReducer from './Products/products.reducer';

const rootReducer = combineReducers({
	UI: uiReducer,
	user: userReducer,
	notifications: notificationsReducer,
	products: productsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
