import React from 'react';
import { useSelector } from 'react-redux';
import NotificationBar, { Notification } from '../components/NotificationBar';
import { NotificationsActions } from '../redux/Notifications/notifications.reducer';
import { RootState } from '../redux/rootReducer';
import { useAppDispatch } from '../redux/store';

const NotificationBarContainer = () => {
  const dispatch = useAppDispatch();
  const notifications: Notification[] = useSelector(
    (state: RootState) => state.notifications
  );

  return (
    <NotificationBar
      notifications={notifications}
      onNotificationDelete={(id: string) =>
        dispatch(NotificationsActions.removeNotification({ id }))
      }
    />
  );
};

export default NotificationBarContainer;
