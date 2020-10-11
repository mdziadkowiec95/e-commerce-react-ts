import thunk from 'redux-thunk';
import configureMockStore, { MockStore } from "redux-mock-store";
import { RootState } from '../../src/redux/rootReducer';

export type AppMockStore = MockStore<RootState | {}, any>;

export const generateMockStore = (state: RootState | {}): AppMockStore => {
	const mockStore = configureMockStore<RootState | {}>([thunk]);
	const store = mockStore(state);
	store.clearActions();

	return store;
};

