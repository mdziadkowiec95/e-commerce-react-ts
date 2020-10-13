import React from 'react';
import thunk from 'redux-thunk';
import configureMockStore, { MockStore } from 'redux-mock-store';
import { ReducerName, RootState } from '../../src/redux/rootReducer';
import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';

export type AppMockStore = MockStore<RootState | {}, any>;

// A helper function to generate mock store using 'redux-mock-store' library
export const generateMockStore = (
  state: RootState | {},
  reduxModule?: ReducerName
): AppMockStore => {
  const mockStore = configureMockStore<RootState | {}>([thunk]);

  // If redux module/reducer name is provided than next the initial state under the module key
  if (reduxModule) {
    state = {
      [reduxModule]: state,
    };
  }

  const store = mockStore(state);
  store.clearActions();

  return store;
};

// A helper function to render some UI wrapped with Redux <Provider>
export function renderWithMockStore(
  ui: ReactElement,
  {
    reducer,
    initialState,
    store = generateMockStore(initialState, reducer),
    mockDispatch = false,
  }: {
    reducer?: ReducerName;
    initialState?: any;
    store?: AppMockStore;
    mockDispatch?: boolean;
  } = {}
) {
  if (mockDispatch) {
    const origDispatch = store.dispatch;
    store.dispatch = jest.fn(origDispatch);
  }

  return { ...render(<Provider store={store}>{ui}</Provider>), store };
}
