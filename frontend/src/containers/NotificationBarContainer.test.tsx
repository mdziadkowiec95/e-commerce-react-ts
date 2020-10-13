import React from 'react';
import { fireEvent, wait } from '@testing-library/react';
import { renderWithMockStore } from '../../tests/helpers/mockStore';
import { NotificationType } from '../components/NotificationBar';
import NotificationBarContainer from './NotificationBarContainer';
import { ReducerName } from '../redux/rootReducer';
import { NotificationsActions } from '../redux/Notifications/notifications.reducer';

describe('<NotificationBarContainer /> tests', () => {
  test('should NOT render any notification if state is empty', () => {
    const { container } = renderWithMockStore(<NotificationBarContainer />, {
      reducer: ReducerName.Notifications,
      initialState: [],
    });

    expect(container.innerHTML).toBeFalsy();
  });
  test('should render single notification from state correctly', () => {
    const { getByText } = renderWithMockStore(<NotificationBarContainer />, {
      reducer: ReducerName.Notifications,
      initialState: [
        {
          id: '1',
          type: NotificationType.Success,
          message: 'Testing NotificationBarContainer',
        },
      ],
    });

    expect(getByText(/Testing NotificationBarContainer/i)).toBeInTheDocument();
  });

  test('should render multiple notifications from state correctly', () => {
    const { getByText } = renderWithMockStore(<NotificationBarContainer />, {
      reducer: ReducerName.Notifications,
      initialState: [
        {
          id: '1',
          type: NotificationType.Success,
          message: 'Testing NotificationBarContainer 1',
        },
        {
          id: '2',
          type: NotificationType.Success,
          message: 'Testing NotificationBarContainer 2',
        },
      ],
    });

    expect(
      getByText(/Testing NotificationBarContainer 1/i)
    ).toBeInTheDocument();
    expect(
      getByText(/Testing NotificationBarContainer 2/i)
    ).toBeInTheDocument();
  });

  test('should dispatch remove action on notification delete click correctly', async () => {
    const { container, store } = renderWithMockStore(
      <NotificationBarContainer />,
      {
        mockDispatch: true,
        reducer: ReducerName.Notifications,
        initialState: [
          {
            id: '1',
            type: NotificationType.Success,
            message: 'Testing NotificationBarContainer 1',
          },
          {
            id: '2',
            type: NotificationType.Success,
            message: 'Testing NotificationBarContainer 2',
          },
        ],
      }
    );

    const deleteBtn = container.querySelector(
      '[data-notification-id="1"] button.delete'
    ) as HTMLButtonElement;

    await wait(() => {
      fireEvent.click(deleteBtn);
    });

    expect(store.dispatch).toHaveBeenCalledWith(
      NotificationsActions.removeNotification({ id: '1' })
    );
  });
});
