import React from 'react';
import { Router } from 'react-router';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

export const renderWithRouter = (component: any) => {
  const history = createMemoryHistory();
  return { ...render(<Router history={history}>{component}</Router>), history };
};
