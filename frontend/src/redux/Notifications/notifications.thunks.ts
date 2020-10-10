import { Notification, NotificationType } from "../../components/NotificationBar";
import { AppDispatch, AppThunk } from "../store";
import { NotificationsActions } from "./notifications.reducer";
import { v4 as uuidv4 } from 'uuid';

export const addNotification = (notification: {
	type: NotificationType,
	message: string;
}, seconds: number = 10): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
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