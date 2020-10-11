import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, wait } from '@testing-library/react';
import NotificationBar, { Notification, NotificationType } from '.';

const testNotificationStyle = (
  type: NotificationType,
  typeClassName: string
) => {
  const { container } = render(
    <NotificationBar
      notifications={[
        {
          id: '123',
          type,
          message: 'First notification message test!',
        },
      ]}
      onNotificationDelete={() => {}}
    />
  );

  const notification = container.querySelector(
    '[data-notification-id="123"]'
  ) as HTMLDivElement;

  expect(notification).toHaveClass('notification', typeClassName);
};

describe('<NotificationBar />', () => {
  test('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <NotificationBar notifications={[]} onNotificationDelete={() => {}} />,
      div
    );
  });

  test('should NOT render anything if the notifications array is empty', () => {
    const { queryByTestId } = render(
      <NotificationBar notifications={[]} onNotificationDelete={() => {}} />
    );

    expect(queryByTestId('NotificationBar_wrapper')).toBeFalsy();
  });

  test('should render notification message', () => {
    const { getByText } = render(
      <NotificationBar
        notifications={[
          {
            id: '123',
            type: NotificationType.Success,
            message: 'First notification message test!',
          },
        ]}
        onNotificationDelete={() => {}}
      />
    );

    expect(getByText('First notification message test!')).toBeTruthy();
  });

  test('should render multiple notifications', () => {
    const notifications = [
      {
        id: '1',
        type: NotificationType.Success,
        message: 'First notification message test!',
      },
      {
        id: '2',
        type: NotificationType.Info,
        message: 'Second notification message test!',
      },
      {
        id: '3',
        type: NotificationType.Error,
        message: 'Third notification message test!',
      },
    ];

    const { getByText } = render(
      <NotificationBar
        notifications={notifications}
        onNotificationDelete={() => {}}
      />
    );

    notifications.forEach((notification: Notification) => {
      expect(getByText(notification.message)).toBeTruthy();
    });
  });

  test('should render success notification correctly', () => {
    testNotificationStyle(NotificationType.Success, 'is-success');
  });

  test('should render error notification correctly', () => {
    testNotificationStyle(NotificationType.Error, 'is-danger');
  });

  test('should render warning notification correctly', () => {
    testNotificationStyle(NotificationType.Warning, 'is-warning');
  });

  test('should render info notification correctly', () => {
    testNotificationStyle(NotificationType.Info, 'is-info');
  });

  test('should emit notification ID on delete button click', async () => {
    const notifications = [
      {
        id: '123',
        type: NotificationType.Success,
        message: 'First notification message test!',
      },
      {
        id: '456',
        type: NotificationType.Info,
        message: 'Second notification message test!',
      },
      {
        id: '789',
        type: NotificationType.Error,
        message: 'Third notification message test!',
      },
    ];

    const onDeleteFn = jest.fn();

    const { container } = render(
      <NotificationBar
        notifications={notifications}
        onNotificationDelete={onDeleteFn}
      />
    );

    const secondNotificationDeleteBtn = container.querySelector(
      '[data-notification-id="456"] button.delete'
    ) as HTMLDivElement;

    await wait(() => {
      fireEvent.click(secondNotificationDeleteBtn);
    });

    expect(onDeleteFn).toHaveBeenCalledTimes(1);
    expect(onDeleteFn).toHaveBeenLastCalledWith('456');
  });
});
