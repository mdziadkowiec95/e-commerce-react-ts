import { combineReducers } from 'redux';

import uiReducer from './UI/UI.reducer';
import userReducer from './User/user.reducer';

const rootReducer = combineReducers({
	UI: uiReducer,
	user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
