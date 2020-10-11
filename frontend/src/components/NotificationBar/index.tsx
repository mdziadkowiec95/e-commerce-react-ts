import React from 'react';
import styles from './NotificationBar.module.scss';

export enum NotificationType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

interface Props {
  notifications: Notification[];
  onNotificationDelete: (id: string) => void;
}

const getNotificationClass = (type: NotificationType) => {
  switch (type) {
    case NotificationType.Success:
      return 'is-success';
    case NotificationType.Warning:
      return 'is-warning';
    case NotificationType.Error:
      return 'is-danger';
    case NotificationType.Info:
      return 'is-info';
    default:
      return 'is-success';
  }
};

const NotificationBar = ({ notifications, onNotificationDelete }: Props) => {
  if (!notifications || notifications.length <= 0) return null;

  return (
    <div
      className={`pt-4 ${styles.wrap}`}
      data-testid="NotificationBar_wrapper"
    >
      <div className="container">
        {notifications.map(({ id, type, message }: Notification) => (
          <div
            key={id}
            data-notification-id={id}
            className={`notification ${getNotificationClass(type)}`}
          >
            <button
              onClick={() => onNotificationDelete(id)}
              className="delete"
            ></button>
            <p>{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationBar;
