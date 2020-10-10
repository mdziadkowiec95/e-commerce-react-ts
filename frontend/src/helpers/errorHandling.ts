import { AxiosError } from "axios";
import { ServerError } from "../common/types/errors";
import { NotificationType } from "../components/NotificationBar";
import { addNotification } from "../redux/Notifications/notifications.thunks";
import { AppDispatch } from "../redux/store";

// Handle error response from Node.js REST API
export const handleServerError = (error: AxiosError<ServerError>, dispatch: AppDispatch) => {
	if (error?.response?.data?.errors?.length) {
		const errorData = error?.response?.data;

		errorData.errors.forEach((err: { msg: string; }) => {
			dispatch(addNotification({
				type: NotificationType.Error,
				message: err.msg
			}));
		});
	}
};