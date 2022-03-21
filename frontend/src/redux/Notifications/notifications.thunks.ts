import { Notification, NotificationType } from 'components/NotificationBar/NotificationBar';
import { AppThunk } from 'redux/store';
import { NotificationsActions } from './notifications.reducer';
import { v4 as uuidv4 } from 'uuid';

export const addNotification = (notification: {
  type: NotificationType,
  message: string;
}, seconds: number = 15): AppThunk => async dispatch => {
  try {
    const timeout = seconds * 1000;
    const notificationId = uuidv4();

    dispatch(NotificationsActions.addNotification({ id: notificationId, ...notification } as Notification));

    setTimeout(() => {
      dispatch(NotificationsActions.removeNotification({ id: notificationId }));
    }, timeout);

  } catch (error) {
    console.error(error);
  }
};