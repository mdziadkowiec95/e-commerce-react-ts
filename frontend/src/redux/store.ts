import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { Action, Store } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from './rootReducer';

const middlewares = [thunk];

const store: Store = configureStore({
	reducer: rootReducer,
	middleware: [...middlewares]
})

export default store;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve type