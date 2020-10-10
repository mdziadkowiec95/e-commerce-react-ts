import React from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import NotificationBar, { Notification } from '../components/NotificationBar';
import { NotificationsActions } from '../redux/Notifications/notifications.reducer';
import * as NotificationThunks from '../redux/Notifications/notifications.thunks';
import { RootState } from '../redux/rootReducer';

interface Props {
  notifications: Notification[];
  addNotification: (
    notification: Notification,
    seconds?: number
  ) => Promise<void>;
  removeNotification: ActionCreatorWithPayload<{ id: string }>;
}

const NotificationBarContainer = ({
  notifications,
  removeNotification,
}: Props) => (
  <NotificationBar
    notifications={notifications}
    onNotificationDelete={(id: string) => removeNotification({ id })}
  />
);

const mapStateToProps = ({ notifications }: RootState) => ({
  notifications,
});

const mapDispatchToProps = {
  addNotification: NotificationThunks.addNotification,
  removeNotification: NotificationsActions.removeNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationBarContainer);
