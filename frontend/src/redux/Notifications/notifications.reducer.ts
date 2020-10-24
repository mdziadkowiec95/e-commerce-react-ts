import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from 'components/NotificationBar/NotificationBar';

const initialState: Notification[] = [];

const notificationsSlice = createSlice({
  name: 'Notifications',
  initialState,
  reducers: {
    addNotification: (state, { payload }: PayloadAction<Notification>) => {
      state.unshift(payload);
    },
    removeNotification: (state, { payload }: PayloadAction<{ id: string; }>) => {
      const notificationIndex: number = state.findIndex((notification: Notification) => notification.id === payload.id);

      if (notificationIndex !== -1) {
        state.splice(notificationIndex, 1);
      }
    }
  }
});

// Export actions
export const NotificationsActions = notificationsSlice.actions;
// Export reducer
export default notificationsSlice.reducer;
