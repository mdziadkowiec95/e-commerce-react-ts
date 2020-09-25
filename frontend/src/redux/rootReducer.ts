import { combineReducers } from 'redux';

import uiReducer from './UI/UI.reducer';

const rootReducer = combineReducers({
  UI: uiReducer,
});

export default rootReducer;
