import { Notification, NotificationType } from '../../components/NotificationBar';
import notificationsReducer, { NotificationsActions } from './notifications.reducer';

describe('Notifications reducer', () => {
	test('should add new notification properly', () => {
		const notification: Notification = { id: '123', type: NotificationType.Success, message: 'Some message for reducer test!' };
		const action = NotificationsActions.addNotification(notification);
		const initialState: Notification[] = notificationsReducer([], action);

		expect(notificationsReducer(initialState, notification)).toEqual([notification]);
	});

	test('should add next notification in correct order', () => {
		const notification: Notification = { id: '123', type: NotificationType.Success, message: 'First message for reducer test!' };
		const action = NotificationsActions.addNotification(notification);
		const initialState: Notification[] = [
			{
				id: '1',
				type: NotificationType.Error,
				message: 'Invalid email!'
			}
		];

		expect(notificationsReducer(initialState, action)).toEqual([notification, ...initialState]);
	});

	test('should remove notification correctly', () => {
		const action = NotificationsActions.removeNotification({ id: '99' });
		const initialState: Notification[] = [
			{
				id: '12',
				type: NotificationType.Error,
				message: 'Invalid email!'
			},
			{
				id: '99',
				type: NotificationType.Success,
				message: 'Invalid email!'
			}
		];

		expect(notificationsReducer(initialState, action)).toEqual([{
			id: '12',
			type: NotificationType.Error,
			message: 'Invalid email!'
		}]);
	});
});